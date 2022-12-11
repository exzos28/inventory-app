import {BaseErrorBody} from './BaseError';

export const NOT_FOUND_ERROR = Symbol.for('Not found');
export type NotFoundError = {
  kind: typeof NOT_FOUND_ERROR;
} & BaseErrorBody;

export type DataError = NotFoundError;
