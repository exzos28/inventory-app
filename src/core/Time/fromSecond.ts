import {Millisecond, Second} from './units';

export default (_: Second) => (_ * 1000) as Millisecond;
