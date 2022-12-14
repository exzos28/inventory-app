import {AppState} from '../AppState';
import {Localization, Translation} from '../Localization';
import {PreferencesService} from '../Preferences';
import {
  NavigationContainer,
  NavigationContainerBinding,
} from '../NavigationContainer';
import {AppLifecycle} from '../AppLifecycle';
import {SpecialLocation} from '../SpecialLocation';
import {NavigationContainerTheme} from '../NavigationContainerTheme';
import {Appearance} from '../Appearance';
import {AppWindow, AppWindowState} from '../AppWindow';
import {WindowDimensions, WindowDimensionsState} from '../WindowDimensions';
import {Configuration} from '../Configuration';
import {AuthHelper, AuthState} from '../Auth';
import {AccountStore} from '../AccountStore';
import {ProjectStore} from '../ProjectStore';
import {ProjectHelper} from '../ProjectHelper';
import {ItemHelperImpl} from '../ItemHelper';
import {ProjectUsersHelper} from '../ProjectUsersHelper';
import {ProjectPermissionHelper} from '../ProjectPermissionHelper';
import {ErrorRepository} from '../ErrorRepository';

export interface Root {
  readonly accountStore: AccountStore;
  readonly projectStore: ProjectStore;
  readonly errorRepository: ErrorRepository;
  readonly appLifecycle: AppLifecycle;
  readonly navigationContainer: NavigationContainer;
  readonly navigationContainerBinding: NavigationContainerBinding;
  readonly specialLocation: SpecialLocation;
  // readonly location: Location;
  // readonly linkingOptionsProvider: LinkingOptionsProvider;
  readonly authHelper: AuthHelper;

  readonly authState: AuthState;
  readonly appState: AppState;
  readonly localization: Localization;
  readonly preferences: PreferencesService;
  readonly translation: Translation;
  readonly navigationContainerTheme: NavigationContainerTheme;
  // readonly deviceInfo: DeviceInfo;

  readonly projectHelper: ProjectHelper;
  readonly itemHelper: ItemHelperImpl;
  readonly projectUsersHelper: ProjectUsersHelper;

  readonly projectPermissionHelper: ProjectPermissionHelper;

  readonly appWindow: AppWindow;
  readonly appWindowState: AppWindowState;
  readonly windowDimensions: WindowDimensions;
  readonly windowDimensionsState: WindowDimensionsState;
  readonly appearance: Appearance;
  readonly configuration: Configuration;
}
