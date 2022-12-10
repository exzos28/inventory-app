import {Opaque} from 'type-fest';

export const ITEM_ID = Symbol.for('Item id');
export type ItemId = Opaque<number, typeof ITEM_ID>;
