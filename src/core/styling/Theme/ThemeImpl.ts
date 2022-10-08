import BaseThemeImpl from './BaseThemeImpl';
import {Theme} from './Theme';
import {Palette} from './Coloring';
import {ScaledSize} from 'react-native';

export default class ThemeImpl extends BaseThemeImpl implements Theme {
  constructor(
    public readonly palette: Palette,
    window: ScaledSize,
    screen: ScaledSize,
  ) {
    super(window, screen);
  }
}
