export const PENDING = Symbol.for('Pending');
export const FULFILLED = Symbol.for('Fulfilled');
export const REJECTED = Symbol.for('Rejected');

export type PromiseState<R, E, P = void> =
  | (P extends void
      ? {readonly status: typeof PENDING; readonly params?: P}
      : {readonly status: typeof PENDING; readonly params: P})
  | {readonly status: typeof FULFILLED; readonly result: R}
  | {readonly status: typeof REJECTED; readonly error: E};
