import {
  Localization as ExpoLocalization,
  getLocalizationAsync,
} from 'expo-localization';
import {flow, observable, reaction} from 'mobx';

import {APP_WINDOW_BACKGROUND, AppWindowState} from '../AppWindow';
import {Service} from '../structure';
import {Localization} from './Localization';

export default class LocalizationService implements Localization, Service {
  @observable.ref private _state?: ExpoLocalization;

  constructor(
    private readonly _root: {readonly appWindowState: AppWindowState},
  ) {}

  get state() {
    return this._state;
  }

  private _load = flow(function* (this: LocalizationService) {
    this._state = yield getLocalizationAsync();
  });

  private _getLocalizationOnActive() {
    return reaction(
      () =>
        this._root.appWindowState.status !== APP_WINDOW_BACKGROUND &&
        this._root.appWindowState.isFocused,
      async shouldGet => {
        if (shouldGet) {
          this._load();
        }
      },
      {fireImmediately: true},
    );
  }

  subscribe() {
    this._getLocalizationOnActive();
    return;
  }
}
