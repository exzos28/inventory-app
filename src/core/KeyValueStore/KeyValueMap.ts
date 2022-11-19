import {Millisecond} from '../Time';

export type KeyValueMap = {
  [K in string]: string;
} & {};

export type AddressHistoryEntry = [address: string, updatedAt: Millisecond];
