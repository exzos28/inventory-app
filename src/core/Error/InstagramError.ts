import {BaseErrorBody} from './BaseError';

export const INSTAGRAM_UNKNOWN_ERROR = Symbol();
export type InstagramUnknownError = {
  kind: typeof INSTAGRAM_UNKNOWN_ERROR;
} & BaseErrorBody;

export const GET_DATA_ERROR = Symbol();
export type GetInstagramDataError = {
  kind: typeof GET_DATA_ERROR;
} & BaseErrorBody;
