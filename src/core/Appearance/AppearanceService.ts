import {action, computed, flow, makeObservable, observable} from 'mobx';
import {
  Appearance as RNAppearance,
  ColorSchemeName,
  Dimensions,
  ScaledSize,
} from 'react-native';
import {define, THEME_KIND} from '../persistence';
import {
  Appearance,
  PreferredThemeKind,
  SystemThemeKind,
  ThemeKind,
} from './Appearance';
import {batchDisposers, Disposer, Service} from '../structure';
import {darkPalette, lightPalette, ThemeImpl} from '../styling';
import {AsyncReturnType} from 'type-fest';
import {bind} from '../fp';

export default class AppearanceService implements Appearance, Service {
  private static _themeModeTransitionMap = new Map([
    [ThemeKind.Auto, ThemeKind.Light],
    [ThemeKind.Light, ThemeKind.Dark],
    [ThemeKind.Dark, ThemeKind.Auto],
  ]);

  @observable
  private _systemThemeKind: SystemThemeKind = colorSchemeToThemeKind(
    RNAppearance.getColorScheme(),
  );
  @observable private _preferredThemeKind: PreferredThemeKind =
    ThemeKind.Unknown;

  get systemThemeKind() {
    return this._systemThemeKind;
  }

  get preferredThemeKind() {
    return this._preferredThemeKind;
  }

  @computed get actualThemeKind() {
    const themeKind =
      this._preferredThemeKind === ThemeKind.Auto
        ? this._systemThemeKind
        : this._preferredThemeKind;
    if (themeKind === ThemeKind.Unknown) {
      return ThemeKind.Light;
    }
    return themeKind;
  }

  @computed get isDark() {
    return this.actualThemeKind === ThemeKind.Dark;
  }

  @observable.ref private _theme = this._createTheme();

  constructor() {
    makeObservable(this);
  }

  private _createTheme(
    window = Dimensions.get('window'),
    screen = Dimensions.get('screen'),
  ) {
    return this.isDark
      ? new ThemeImpl(darkPalette, window, screen)
      : new ThemeImpl(lightPalette, window, screen);
  }

  get theme() {
    return this._theme;
  }

  private _load = flow(function* (this: AppearanceService) {
    const _getThemeMode: AsyncReturnType<typeof getThemeMode> =
      yield getThemeMode();
    if (!_getThemeMode.success) {
      this._preferredThemeKind = ThemeKind.Unknown;
    } else if (_getThemeMode.right === null) {
      this._preferredThemeKind = ThemeKind.Auto;
    } else {
      this._preferredThemeKind = _getThemeMode.right;
    }
    this._theme = this._createTheme();
  });

  @action
  toggleThemeKind = bind(
    flow(function* (this: AppearanceService) {
      const next = this.isDark ? ThemeKind.Light : ThemeKind.Dark;
      this.setThemeMode(next);
    }),
    this,
  );

  @action
  togglePreferredThemeKind = bind(
    flow(function* (this: AppearanceService) {
      const next =
        AppearanceService._themeModeTransitionMap.get(
          this._preferredThemeKind,
        ) ?? ThemeKind.Auto;
      this.setThemeMode(next);
    }),
    this,
  );

  setThemeMode = bind(
    flow(function* (this: AppearanceService, next: ThemeKind) {
      yield putThemeMode(next);
      this._preferredThemeKind = next;
      this._theme = this._createTheme();
    }),
    this,
  );

  private _initialize() {
    const loading = this._load();
    return (() => loading.cancel()) as Disposer;
  }

  private _listenToColorSchemeChanges() {
    const listener: RNAppearance.AppearanceListener = action(
      ({colorScheme}) => {
        this._systemThemeKind = colorSchemeToThemeKind(colorScheme);
        this._theme = this._createTheme();
      },
    );
    const listener_ = RNAppearance.addChangeListener(listener);
    return (() => {
      listener_.remove();
    }) as Disposer;
  }

  @action.bound private _onSizeChange(update: {
    window: ScaledSize;
    screen: ScaledSize;
  }) {
    this._theme = this._createTheme(update.window, update.screen);
  }

  private _listenToDimensionsChanges() {
    const change_ = Dimensions.addEventListener('change', this._onSizeChange);
    return (() => {
      change_.remove();
    }) as Disposer;
  }

  subscribe() {
    return batchDisposers(
      this._initialize(),
      this._listenToColorSchemeChanges(),
      this._listenToDimensionsChanges(),
    );
  }
}

const [getThemeMode, putThemeMode] = define<ThemeKind>(THEME_KIND);

const colorSchemeToThemeKind = (scheme: ColorSchemeName): SystemThemeKind => {
  switch (scheme) {
    case 'light':
      return ThemeKind.Light;
    case 'dark':
      return ThemeKind.Dark;
  }
  return ThemeKind.Unknown;
};
