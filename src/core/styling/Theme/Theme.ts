import {Adaptive} from './Adaptive';
import {Coloring} from './Coloring';
import {UniversalColor} from '../util';
import {Color} from 'chroma-js';

export interface Theme extends Coloring, Adaptive {
  chroma(color: UniversalColor): Color;
}
