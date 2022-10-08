import {Opaque} from 'type-fest';

export const MILLISECOND = Symbol('Millisecond');
export type Millisecond = Opaque<number, typeof MILLISECOND>;

export const SECOND = Symbol('Second');
export type Second = Opaque<number, typeof SECOND>;

export const ISO_DATE_STRING = Symbol('ISO string representing a date');
export type ISODateString = Opaque<string, typeof ISO_DATE_STRING>;
