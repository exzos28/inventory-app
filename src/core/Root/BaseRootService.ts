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
  AuthedFetchImpl,
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
import {HttpFactory} from '../Http';
import {UserRestClientImpl} from '../UserRestClient';
import {AccountStoreService} from '../AccountStore';
import {ProjectRestClientImpl} from '../ProjectRestClient';
import {ProjectStoreService} from '../ProjectStore';
import {ProjectRestClientHelperImpl} from '../ProjectRestClientHelper';
import {ItemRestClientImpl} from '../ItemRestClient';
import {ItemRestClientHelperImpl} from '../ItemRestClientHelper';

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
  readonly authedFetch = new AuthedFetchImpl(this);
  readonly http = new HttpFactory(this).create();

  readonly errorParser = new ErrorParserImpl(this);

  readonly time = new TimeImpl();
  readonly rfc4648 = new Rfc4648Impl(this);
  readonly textEndec = new TextEndecImpl(this);
  readonly jwt = new JwtImpl(this);
  readonly jwtHelper = new JwtHelperImpl(this);

  //
  readonly authRestClient = new AuthRestClientImpl(this, this.http);
  readonly authRestClientHelper = new AuthRestClientHelperImpl(this);
  readonly userRestClient = new UserRestClientImpl(this, this.authedFetch);

  readonly projectRestClient = new ProjectRestClientImpl(
    this,
    this.authedFetch,
  );
  readonly projectRestClientHelper = new ProjectRestClientHelperImpl(this);
  readonly itemRestClient = new ItemRestClientImpl(this, this.authedFetch);
  readonly itemRestClientHelper = new ItemRestClientHelperImpl(this);
  //

  //
  readonly projectStore = new ProjectStoreService(this);
  readonly accountStore = new AccountStoreService(this);
  //

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
      this.authClient.subscribe(),
      this.authState.subscribe(),

      this.accountStore.subscribe(),
      this.projectStore.subscribe(),

      this.localization.subscribe(),
      this.preferences.subscribe(),

      this.appState.subscribe(),
      this.appWindow.subscribe(),
      this.appWindowState.subscribe(),
      this.windowDimensions.subscribe(),
      this.windowDimensionsState.subscribe(),
    );
  }

  abstract readonly appleOAuth2Provider: AppleOAuth2Provider;
  abstract readonly deviceInfo: DeviceInfo;
  abstract readonly jsonKeyValueStore: JsonKeyValueStore<JsonKeyValueMap>;
  abstract readonly jsonSecureKeyValueStore: JsonKeyValueStore<JsonSecureKeyValueMap>;
}
