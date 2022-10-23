import {Service} from '../structure';
import {action, observable} from 'mobx';
import {Dimensions, WindowDimensions} from './WindowDimensions';
import {ScaledSize} from 'react-native';
import {WindowDimensionsState} from './WindowDimensionsState';
import WindowDimensionsStatic from './WindowDimensionsStatic';

export default class WindowDimensionsStateService
  implements WindowDimensionsState, Service
{
  @observable private _dimensions: Dimensions;

  constructor(
    private readonly _root: {readonly windowDimensions: WindowDimensions},
  ) {
    this._dimensions = WindowDimensionsStatic.getInitialDimensions();
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
