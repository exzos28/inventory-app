import {action, makeObservable, observable} from 'mobx';
import {
  AppState as RNAppState,
  AppStateStatus,
  NativeEventSubscription,
  Platform,
} from 'react-native';
import {AppState} from './AppState';
import translateStatus from './translateStatus';
import {Disposer, Service} from '../structure';

export default class AppStateService implements AppState, Service {
  @observable private _status = translateStatus(RNAppState.currentState);
  @observable private _isFocused = true;

  get status() {
    return this._status;
  }

  get isFocused() {
    return this._isFocused;
  }

  @action.bound private _onChange(status: AppStateStatus) {
    this._status = translateStatus(status);
  }

  @action.bound private _onFocus() {
    this._isFocused = true;
  }

  @action.bound private _onBlur() {
    this._isFocused = false;
  }

  constructor() {
    makeObservable(this);
  }

  subscribe() {
    const change_ = RNAppState.addEventListener('change', this._onChange);
    let focus_: NativeEventSubscription | undefined;
    let blur_: NativeEventSubscription | undefined;
    if (Platform.OS === 'android') {
      focus_ = RNAppState.addEventListener('focus', this._onFocus);
      blur_ = RNAppState.addEventListener('blur', this._onBlur);
    }
    return (() => {
      change_.remove();
      if (Platform.OS === 'android') {
        focus_?.remove();
        blur_?.remove();
      }
    }) as Disposer;
  }
}
