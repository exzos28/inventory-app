import {NavigationState} from '@react-navigation/routers';
import {RefCallback} from 'react';
import {NavigationContainerRef, ParamListBase} from '@react-navigation/native';

export interface NavigationContainerBinding {
  readonly props: NavigationContainerBindingProps;
}

export type NavigationContainerBindingProps = {
  onStateChange: (state: NavigationState | undefined) => void;
  onReady: () => void;
  ref: RefCallback<NavigationContainerRef<ParamListBase>>;
};
