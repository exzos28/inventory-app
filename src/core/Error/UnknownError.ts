import {BaseErrorBody} from './BaseError';

export const UNKNOWN_ERROR = Symbol('UNKNOWN_ERROR');
export type UnknownError = {
  kind: typeof UNKNOWN_ERROR;
} & BaseErrorBody;
