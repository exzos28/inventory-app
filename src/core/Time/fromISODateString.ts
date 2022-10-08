import {ISODateString} from './units';
import fromDate from './fromDate';

export default (_: ISODateString) => fromDate(new Date(_));
