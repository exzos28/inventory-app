import {Opaque} from 'type-fest';

export enum UserRole {
  Owner = 'OW',
  Admin = 'AD',
  Manager = 'WA',
  User = 'EM',
}

export const USER_ID = Symbol.for('User id');
export type UserId = Opaque<number, typeof USER_ID>;
