import {CancellationError} from '../Error';
import {Either} from '../fp';

export type CancellablePromiseEither<R, E> = Promise<
  Either<R, E | CancellationError>
> &
  CancellablePromiseMixin;

export type CancellablePromiseMixin = {
  cancel(): void;
};
