import {
  NavigationContainerRef,
  NavigationState,
  ParamListBase,
} from '@react-navigation/native';

export interface NavigationContainer {
  readonly ref?: NavigationContainerRef<ParamListBase>;
  readonly state?: NavigationState;
  readonly isReady: boolean;
  readonly isConfigured: boolean;
}
