import {PromiseCancellationError} from '../Error';
import {Either} from '../fp';

export type CancellablePromiseEither<R, E> = Promise<
  Either<R, E | PromiseCancellationError>
> &
  CancellablePromiseMixin;

export type CancellablePromiseMixin = {
  cancel(): void;
};
