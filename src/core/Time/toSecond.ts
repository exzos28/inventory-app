import {Millisecond, Second} from './units';

export default (_: Millisecond) => (_ / 1000) as Second;
