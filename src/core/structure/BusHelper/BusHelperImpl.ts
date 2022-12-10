import {CancellablePromiseEither} from '../../CancellablePromise';
import {
  PROMISE_CANCELLATION_ERROR,
  PromiseCancellationError,
} from '../../Error';
import {ErrorRepository} from '../../ErrorRepository';
import {Either, error, success} from '../../fp';
import {BaseListener, BusSource} from '../Bus';
import {BusHelper} from './BusHelper';

export default class BusHelperImpl<L extends BaseListener>
  implements BusHelper<L>
{
  constructor(
    private readonly _root: {
      readonly errorRepository: ErrorRepository;
    },
    private readonly _source: BusSource<L>,
  ) {}

  when(
    condition?: (...args: Parameters<L>) => boolean,
  ): CancellablePromiseEither<Parameters<L>, never> {
    let cancel: () => void;
    const promise = new Promise<
      Either<Parameters<L>, PromiseCancellationError>
    >(resolve => {
      const listener = ((...args: Parameters<L>) => {
        if (condition === undefined || condition(...args)) {
          this._source.forget(listener);
          resolve(success(args));
        }
      }) as L;
      cancel = () => {
        this._source.forget(listener);
        resolve(
          error(
            this._root.errorRepository.create<PromiseCancellationError>({
              kind: PROMISE_CANCELLATION_ERROR,
            }),
          ),
        );
      };
      this._source.listen(listener);
    });
    Reflect.set(promise, 'cancel', () => cancel());
    return promise as CancellablePromiseEither<Parameters<L>, never>;
  }
}
