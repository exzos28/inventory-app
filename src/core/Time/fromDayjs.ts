import {Dayjs} from 'dayjs';
import fromDate from './fromDate';

export default (_: Dayjs) => fromDate(_.toDate());
