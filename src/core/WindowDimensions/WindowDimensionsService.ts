import {Disposer, Service} from '../structure';
import {Dimensions as RNDimensions} from 'react-native';
import {action} from 'mobx';
import {Dimensions, WindowDimensions} from './WindowDimensions';
import {BusImpl} from '../structure/Bus';

export default class WindowDimensionsService
  implements WindowDimensions, Service {
  private readonly _updates = new BusImpl<Dimensions>();

  get updates() {
    return this._updates;
  }

  private _onSizeChange = action((update: Dimensions) =>
    this._updates.send(update),
  );

  private _listenToDimensionsChanges() {
    const change = RNDimensions.addEventListener('change', this._onSizeChange);
    return (() => change.remove()) as Disposer;
  }

  subscribe() {
    return this._listenToDimensionsChanges();
  }
}
