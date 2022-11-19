import {CancellablePromiseEither} from '../../CancellablePromise';
import {GlobalError} from '../../Error';
import {BaseListener} from '../Bus';

export interface BusHelper<L extends BaseListener> {
  when(
    condition?: (...args: Parameters<L>) => boolean,
  ): CancellablePromiseEither<Parameters<L>, GlobalError>;
}
