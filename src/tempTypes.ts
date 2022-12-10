import {Url} from './core';
import {Opaque} from 'type-fest';

/**
 * @deprecated
 */
export type ItemType = {
  id: ItemId;
  image?: Url;
  name: string;
  serialNumber: string;
  fields: {
    label: string;
    value: string;
  }[];
  qrData: null | string;
};

/**
 * @deprecated
 */
export type UserType = {
  id: UserId;
  name: string;
  role: UserRole;
};

/**
 * @deprecated
 */
export enum UserRole {
  Owner,
  Admin,
  Manager,
  User,
}

/**
 * @deprecated
 */
export const ITEM_ID = Symbol.for('Item id');
/**
 * @deprecated
 */
export type ItemId = Opaque<string, typeof ITEM_ID>;

/**
 * @deprecated
 */
export const USER_ID = Symbol.for('User id');
/**
 * @deprecated
 */
export type UserId = Opaque<string, typeof USER_ID>;
