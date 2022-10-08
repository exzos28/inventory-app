export const PENDING = Symbol('Pending');
export const FULFILLED = Symbol('Fulfilled');
export const REJECTED = Symbol('Rejected');

export type PromiseState<R, E> =
  | {readonly status: typeof PENDING}
  | {readonly status: typeof FULFILLED; readonly result: R}
  | {readonly status: typeof REJECTED; readonly error: E};
