import {flow, makeObservable, observable, reaction} from 'mobx';
import {AppState, AppStatus} from '../AppState';
import {
  getLocalizationAsync,
  Localization as ExpoLocalization,
} from 'expo-localization';

export default class Localization {
  @observable.ref private _state?: ExpoLocalization;

  constructor(private readonly _root: {readonly appState: AppState}) {
    makeObservable(this);
  }

  get state() {
    return this._state;
  }

  private _load = flow(function* (this: Localization) {
    this._state = yield getLocalizationAsync();
  });

  private _getLocalizationOnActive = () =>
    reaction(
      () =>
        this._root.appState.status !== AppStatus.Background &&
        this._root.appState.isFocused,
      async shouldGet => {
        if (shouldGet) {
          this._load();
        }
      },
      {fireImmediately: true},
    );

  subscribe = this._getLocalizationOnActive;
}
