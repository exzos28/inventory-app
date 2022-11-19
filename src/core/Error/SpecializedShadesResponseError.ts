import {ErrorResponse} from '../ShadesServer';
import {BaseErrorBody} from './BaseError';

export const SPECIALIZED_SHADES_RESPONSE_ERROR = Symbol();
export type SpecializedShadesResponseError = {
  kind: typeof SPECIALIZED_SHADES_RESPONSE_ERROR;
} & ErrorResponse &
  BaseErrorBody;
