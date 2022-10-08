import {Millisecond} from './units';
import {Time} from './Time';

export default class TimeImpl implements Time {
  now() {
    return Date.now() as Millisecond;
  }
}
