import {Millisecond} from './units';

export default (_: Date) => _.getTime() as Millisecond;
