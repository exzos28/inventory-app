import {Url} from './core';
import {Opaque} from 'type-fest';
import {UserId, UserRole} from './core/HadesServer';

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
export const ITEM_ID = Symbol.for('Item id');
/**
 * @deprecated
 */
export type ItemId = Opaque<string, typeof ITEM_ID>;
