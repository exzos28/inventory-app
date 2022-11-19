import {ScaledSize} from 'react-native';

import {action, makeAutoObservable, observable} from 'mobx';

import {Service} from '../structure';
import {Dimensions, WindowDimensions} from './WindowDimensions';
import {WindowDimensionsState} from './WindowDimensionsState';
import WindowDimensionsStatic from './WindowDimensionsStatic';

export default class WindowDimensionsStateService
  implements WindowDimensionsState, Service
{
  @observable.ref private _dimensions: Dimensions;

  constructor(
    private readonly _root: {readonly windowDimensions: WindowDimensions},
  ) {
    this._dimensions = WindowDimensionsStatic.getInitialDimensions();
    makeAutoObservable(this);
  }

  get window(): ScaledSize {
    return this._dimensions.window;
  }

  get screen(): ScaledSize {
    return this._dimensions.screen;
  }

  private _onChange = action(
    (dimensions: Dimensions) => (this._dimensions = dimensions),
  );

  subscribe() {
    const {updates} = this._root.windowDimensions;
    return updates.listen(this._onChange);
  }
}
