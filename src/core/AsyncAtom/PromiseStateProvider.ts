import {Either} from '../fp';
import {PromiseState} from './PromiseState';
import {PromiseCancellationError} from '../Error';

export interface PromiseStateProvider<R, E> {
  readonly state: PromiseState<R, E | PromiseCancellationError> | undefined;
  fetch(): Promise<Either<R, E | PromiseCancellationError>>;
  cancel(): void;
}
