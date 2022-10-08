import chroma, {Color} from 'chroma-js';

export type UniversalColor = string | number | Color;

export default (color: UniversalColor): Color =>
  typeof color === 'object' ? color : chroma(color);
