import {AppState} from '../AppState';
import {Localization, Translation} from '../Localization';
import {PreferencesService} from '../Preferences';
import {
  NavigationContainer,
  NavigationContainerBinding,
} from '../NavigationContainer';
import {AppLifecycle} from '../AppLifecycle';
import {SpecialLocation} from '../SpecialLocation';
import {Location} from '../Location';
import {LinkingOptionsProvider} from '../LinkingOptionsProvider';
import {NavigationContainerTheme} from '../NavigationContainerTheme';
import {DeviceInfo} from '../DeviceInfo';
import {Appearance} from '../Appearance';
import {AppWindow, AppWindowState} from '../AppWindow';
import {WindowDimensions, WindowDimensionsState} from '../WindowDimensions';
import {Configuration} from '../Configuration';

export interface Root {
  readonly appLifecycle: AppLifecycle;
  readonly navigationContainer: NavigationContainer;
  readonly navigationContainerBinding: NavigationContainerBinding;
  readonly specialLocation: SpecialLocation;
  readonly linkingOptionsProvider: LinkingOptionsProvider;
  readonly location: Location;
  readonly appState: AppState;
  readonly localization: Localization;
  readonly preferences: PreferencesService;
  readonly translation: Translation;
  readonly navigationContainerTheme: NavigationContainerTheme;
  readonly deviceInfo: DeviceInfo;

  readonly appWindow: AppWindow;
  readonly appWindowState: AppWindowState;
  readonly windowDimensions: WindowDimensions;
  readonly windowDimensionsState: WindowDimensionsState;
  readonly appearance: Appearance;
  readonly configuration: Configuration;
}
