import {Millisecond} from './units';

export interface Time {
  now(): Millisecond;
}
