import {AppStateService} from '../AppState';
import {LocalizationService, TranslationService} from '../Localization';
import {NavigationContainerImpl} from '../NavigationContainer';
import {Root} from './Root';
import {batchDisposers, Service} from '../structure';
import {Core} from '../Core';
import {DeviceInfo} from '../DeviceInfo';
import {NavigationContainerThemeImpl} from '../NavigationContainerTheme';
import {SpecialLocationImpl} from '../SpecialLocation';
import {PreferencesService} from '../Preferences';
import {AppWindowService, AppWindowStateService} from '../AppWindow';
import {
  WindowDimensionsService,
  WindowDimensionsStateService,
} from '../WindowDimensions';
import {
  JsonKeyValueMap,
  JsonKeyValueStore,
  JsonSecureKeyValueMap,
} from '../JsonKeyValueStore';
import {Sha256Impl} from '../BasicCrypto';
import {TimeImpl} from '../Time';
import {Rfc4648Impl} from '../Rfc4648';
import {TextEndecImpl} from '../TextEndec';
import {JwtImpl} from '../Jwt';
import {
  AuthHelperImpl,
  AuthQueryImpl,
  AuthRestClientHelperImpl,
  AuthStateService,
  JwtHelperImpl,
  LocalAuthClientService,
} from '../Auth';
import {ErrorParserImpl} from '../ErrorParser';
import {AuthRestClientImpl} from '../AuthRestClient';
import {OAuth2ConsumerService} from '../OAuth2Consumer';
import {AppleOAuth2Provider} from '../OAuth2Provider';
import {Http} from '../Http';

export default abstract class BaseRootService implements Root, Service {
  constructor(protected readonly _core: Core) {}

  get json() {
    return this._core.json;
  }

  get appearance() {
    return this._core.appearance;
  }
  get configuration() {
    return this._core.configuration;
  }
  readonly sha256 = new Sha256Impl(this);
  get errorRepository() {
    return this._core.errorRepository;
  }
  readonly errorParser = new ErrorParserImpl(this);
  readonly time = new TimeImpl();
  readonly rfc4648 = new Rfc4648Impl(this);
  readonly textEndec = new TextEndecImpl(this);
  readonly jwt = new JwtImpl(this);
  readonly jwtHelper = new JwtHelperImpl(this);

  readonly authRestClient = new AuthRestClientImpl(this);
  readonly authRestClientHelper = new AuthRestClientHelperImpl(this);
  readonly authClient = new LocalAuthClientService(this);
  readonly authHelper = new AuthHelperImpl(this);
  readonly authQuery = new AuthQueryImpl(this);
  readonly authState = new AuthStateService(this);
  readonly oAuth2Consumer = new OAuth2ConsumerService(this);

  readonly navigationContainer = new NavigationContainerImpl();
  readonly navigationContainerBinding = this.navigationContainer;
  readonly navigationContainerTheme = new NavigationContainerThemeImpl(this);
  readonly specialLocation = new SpecialLocationImpl();
  readonly appState = new AppStateService();
  readonly localization = new LocalizationService(this);
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
      this.authClient.subscribe(),
      this.authState.subscribe(),
      this.appWindow.subscribe(),
      this.appWindowState.subscribe(),
      this.localization.subscribe(),
      this.preferences.subscribe(),
      this.windowDimensions.subscribe(),
      this.windowDimensionsState.subscribe(),
    );
  }

  abstract readonly http: Http;
  abstract readonly appleOAuth2Provider: AppleOAuth2Provider;
  abstract readonly deviceInfo: DeviceInfo;
  abstract readonly jsonKeyValueStore: JsonKeyValueStore<JsonKeyValueMap>;
  abstract readonly jsonSecureKeyValueStore: JsonKeyValueStore<JsonSecureKeyValueMap>;
}
