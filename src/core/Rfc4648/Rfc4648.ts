import {Base32} from './Base32';
import {Either} from '../fp';
import {GlobalError} from '../Error';
import {Base64Url} from './Base64Url';

export interface Rfc4648 {
  toBase32<T extends ArrayBuffer = ArrayBuffer>(
    input: T,
    options?: EncodingOptions,
  ): Either<Base32<T>, GlobalError>;
  fromBase64Url<T extends ArrayBuffer = ArrayBuffer>(
    input: Base64Url<T>,
  ): Either<T, GlobalError>;
}

export type EncodingOptions = {
  shouldIncludePadding?: boolean;
};
