import {AppStateService} from '../AppState';
import {Localization, TranslationService} from '../Localization';
import {NavigationContainerImpl} from '../NavigationContainer';
import {Root} from './Root';
import {batchDisposers, Service} from '../structure';
import {Core} from '../Core';
import {DeviceInfo} from '../DeviceInfo';
import {NavigationContainerThemeImpl} from '../NavigationContainerTheme';
import {SpecialLocationImpl} from '../SpecialLocation';
import {Location} from '../Location';
import {LinkingOptionsProvider} from '../LinkingOptionsProvider';
import {PreferencesService} from '../Preferences';
import {AppWindowService, AppWindowStateService} from '../AppWindow';
import {
  WindowDimensionsService,
  WindowDimensionsStateService,
} from '../WindowDimensions';

export default abstract class BaseRootService implements Root, Service {
  protected constructor(protected readonly _core: Core) {}

  get http() {
    return this._core.http;
  }

  get json() {
    return this._core.json;
  }

  get errorRepository() {
    return this._core.errorRepository;
  }

  get keyValueStore() {
    return this._core.keyValueStore;
  }

  get jsonKeyValueStore() {
    return this._core.jsonKeyValueStore;
  }

  get appearance() {
    return this._core.appearance;
  }
  get configuration() {
    return this._core.configuration;
  }

  readonly navigationContainer = new NavigationContainerImpl();
  readonly navigationContainerBinding = this.navigationContainer;
  readonly navigationContainerTheme = new NavigationContainerThemeImpl(this);
  readonly specialLocation = new SpecialLocationImpl();
  readonly appState = new AppStateService();
  readonly localization = new Localization(this);
  readonly preferences = new PreferencesService();
  readonly translation = new TranslationService(this);
  readonly appWindow = new AppWindowService();
  readonly appWindowState = new AppWindowStateService(this);
  readonly windowDimensions = new WindowDimensionsService();
  readonly windowDimensionsState = new WindowDimensionsStateService(this);

  get appLifecycle() {
    return this._core.appLifecycle;
  }

  subscribe() {
    return batchDisposers(
      this.appState.subscribe(),
      this.localization.subscribe(),
      this.preferences.subscribe(),
    );
  }

  abstract readonly deviceInfo: DeviceInfo;
  abstract readonly location: Location;
  abstract readonly linkingOptionsProvider: LinkingOptionsProvider;
}
