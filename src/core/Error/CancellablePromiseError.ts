import {BaseErrorBody} from './BaseError';

export const PROMISE_CANCELLATION_ERROR = Symbol();
export type PromiseCancellationError = {
  kind: typeof PROMISE_CANCELLATION_ERROR;
} & BaseErrorBody;
