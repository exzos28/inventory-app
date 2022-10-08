import {BaseErrorBody} from './BaseError';

export const NOT_AUTHORIZED_ERROR = Symbol();
export type NotAuthorizedError = {
  kind: typeof NOT_AUTHORIZED_ERROR;
} & BaseErrorBody;

export const NOT_FOUND_LINKED_ACCOUNTS = Symbol();
export type NotFoundLinkedAccounts = {
  kind: typeof NOT_FOUND_LINKED_ACCOUNTS;
} & BaseErrorBody;
