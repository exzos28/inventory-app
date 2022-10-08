import {action, computed, makeObservable, observable} from 'mobx';
import {
  NavigationContainerRef,
  NavigationState,
  ParamListBase,
} from '@react-navigation/native';
import {NavigationContainerBinding} from './NavigationContainerBinding';
import {NavigationContainer} from './NavigationContainer';

export default class NavigationContainerImpl
  implements NavigationContainer, NavigationContainerBinding
{
  @observable.ref private _ref?: NavigationContainerRef<ParamListBase>;
  @observable.ref private _state?: NavigationState;
  @observable private _isReady = false;

  constructor() {
    makeObservable(this);
  }

  get ref() {
    return this._ref;
  }

  get isReady() {
    return this._isReady;
  }

  get state() {
    return this._state;
  }

  @computed
  get isConfigured() {
    return this._isReady && this._state !== undefined;
  }

  readonly props = {
    onStateChange: action((state?: NavigationState) => {
      this._state = state;
    }),
    onReady: action(() => {
      this._isReady = true;
    }),
    ref: action((ref: NavigationContainerRef<ParamListBase> | null) => {
      this._ref = ref ?? undefined;
    }),
  };
}
