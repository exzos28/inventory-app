/**
 * EnDec = Encode + Decode, like SerDes = serialize + deserialize
 */
import {Either} from '../fp';
import {GlobalError} from '../Error';

export interface TextEndec {
  decode<T extends string>(input: TextBuffer<T>): Either<T, GlobalError>;
}

export const TEXT_BUFFER = Symbol();
export type TextBuffer<T extends string> = ArrayBuffer & {
  readonly [TEXT_BUFFER]: T;
};
