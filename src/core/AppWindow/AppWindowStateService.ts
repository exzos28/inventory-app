import {action, observable} from 'mobx';
import {AppState as RNAppState} from 'react-native';
import AppWindowStatic from './AppWindowStatic';
import {batchDisposers, Service} from '../structure';
import {AppWindowState} from './AppWindowState';
import {
  APP_WINDOW_ACTIVE,
  APP_WINDOW_BACKGROUND,
  APP_WINDOW_BLUR,
  APP_WINDOW_EXTENSION,
  APP_WINDOW_FOCUS,
  APP_WINDOW_INACTIVE,
  APP_WINDOW_UNKNOWN,
  AppWindow,
  AppWindowStatus,
} from './AppWindow';

export default class AppWindowStateService implements AppWindowState, Service {
  @observable private _status = AppWindowStatic.translateStatus(
    RNAppState.currentState,
  );
  @observable private _isFocused = true;

  constructor(private readonly _root: {readonly appWindow: AppWindow}) {}

  get status() {
    return this._status;
  }

  get isFocused() {
    return this._isFocused;
  }

  private _onFocus = action((isFocused: boolean) => {
    this._isFocused = isFocused;
  });

  private _onStatus = action((status: AppWindowStatus) => {
    this._status = status;
  });

  subscribe() {
    const {updates} = this._root.appWindow;
    return batchDisposers(
      updates.listen(APP_WINDOW_FOCUS, this._onFocus),
      updates.listen(APP_WINDOW_BLUR, this._onFocus),
      updates.listen(APP_WINDOW_ACTIVE, this._onStatus),
      updates.listen(APP_WINDOW_BACKGROUND, this._onStatus),
      updates.listen(APP_WINDOW_INACTIVE, this._onStatus),
      updates.listen(APP_WINDOW_EXTENSION, this._onStatus),
      updates.listen(APP_WINDOW_UNKNOWN, this._onStatus),
    );
  }
}
