import {Theme} from './Theme';
import {ScaledSize} from 'react-native';
import {UniversalColor, color} from '../util';
import chroma, {Color} from 'chroma-js';
import {MediaQuery} from './Adaptive';
import {Palette} from './Coloring';

export default abstract class BaseThemeImpl implements Theme {
  protected constructor(
    private readonly _window: ScaledSize,
    private readonly _screen: ScaledSize,
  ) {}

  get window() {
    return this._window;
  }

  get screen() {
    return this._screen;
  }

  mediaQuery(query: MediaQuery) {
    const queryKeys = Object.keys(query).map(Number);
    let result = {};
    const screenWidth = this._window.width;
    for (const q of queryKeys) {
      if (screenWidth >= q) {
        result = {...result, ...query[q]};
      }
    }
    return result;
  }

  abstract get palette(): Palette;

  chroma(this: Theme, _color: UniversalColor): Color {
    return color(_color);
  }

  mix(_back: UniversalColor, _front: UniversalColor) {
    const back = chroma(_back);
    const front = chroma(_front);
    const alpha = front.alpha();
    const r = alpha * front.get('rgb.r') + (1 - alpha) * back.get('rgb.r');
    const g = alpha * front.get('rgb.g') + (1 - alpha) * back.get('rgb.g');
    const b = alpha * front.get('rgb.b') + (1 - alpha) * back.get('rgb.b');
    return chroma.rgb(r, g, b);
  }
}
