import {BaseErrorBody} from './BaseError';

export const COOKIE_SET_ERROR = Symbol();
export type CookieSetError = {
  kind: typeof COOKIE_SET_ERROR;
} & BaseErrorBody;

export const COOKIE_DELETE_ERROR = Symbol();
export type CookieDeleteError = {
  kind: typeof COOKIE_DELETE_ERROR;
} & BaseErrorBody;

export const COOKIE_GET_ERROR = Symbol();
export type CookieGetError = {
  kind: typeof COOKIE_GET_ERROR;
} & BaseErrorBody;

export const NOT_FOUND_SAVED_INSTAGRAM_COOKIES = Symbol();
export type NotFoundSavedInstagramCookies = {
  kind: typeof NOT_FOUND_SAVED_INSTAGRAM_COOKIES;
} & BaseErrorBody;

export const COOKIE_INVALID = Symbol();
export type CookieInvalid = {
  kind: typeof COOKIE_INVALID;
} & BaseErrorBody;
