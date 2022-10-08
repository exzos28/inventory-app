import {Opaque} from 'type-fest';

export const ACCOUNT_ID = Symbol();
export type AccountId = Opaque<string, typeof ACCOUNT_ID>;
