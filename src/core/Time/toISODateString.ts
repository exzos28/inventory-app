import {ISODateString, Millisecond} from './units';

export default (_: Millisecond) => new Date(_).toISOString() as ISODateString;
