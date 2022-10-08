import {contrast} from 'chroma-js';
import color, {UniversalColor} from './color';

/**
 * Choose one of the two colors that contrasts the most with the target color.
 * @param _target
 * @param _foreground
 * @param _background
 * @return The most contrast color
 */
export default <T extends UniversalColor>(
  _target: UniversalColor,
  _foreground: T,
  _background: T,
): T => {
  const target = color(_target);
  const foreground = color(_foreground);
  const background = color(_background);
  return contrast(background, target) > contrast(foreground, target)
    ? _background
    : _foreground;
};
