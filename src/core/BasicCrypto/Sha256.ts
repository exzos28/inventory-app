import {Opaque} from 'type-fest';

import {Maybe} from '../Maybe';

export interface Sha256 {
  hash(input: string): Promise<Maybe<HexString>>;
}

export const HEX_STRING = Symbol();
export type HexString = Opaque<string, typeof HEX_STRING>;
