import {Url} from './core';
import {Opaque} from 'type-fest';

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

export type ProjectType = {
  id: ProjectId;
  name: string;
};

export type UserType = {
  id: UserId;
  name: string;
  role: UserRole;
};

export enum UserRole {
  Owner,
  Admin,
  Manager,
  User,
}

export const ITEM_ID = Symbol.for('Item id');
export type ItemId = Opaque<string, typeof ITEM_ID>;

export const USER_ID = Symbol.for('User id');
export type UserId = Opaque<string, typeof USER_ID>;

export const PROJECT_ID = Symbol.for('Project id');
export type ProjectId = Opaque<string, typeof PROJECT_ID>;
