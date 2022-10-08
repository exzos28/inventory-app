import {Either} from '../fp';
import {Url} from '../units';
import {BusSource} from '../structure';

export interface LocationSource {
  getInitial(): Promise<Either<Url, void>>;
  updates: BusSource<Url>;
}
