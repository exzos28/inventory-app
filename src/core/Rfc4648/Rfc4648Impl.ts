import {EncodingOptions, Rfc4648} from './Rfc4648';
import {Base32} from './Base32';
import {base32, base64url} from 'rfc4648';
import {Either, error, success} from '../fp';
import {DECODE_ERROR, DecodeError, ENCODE_ERROR, EncodeError} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {Base64Url} from './Base64Url';

export default class Rfc4648Impl implements Rfc4648 {
  constructor(private readonly _root: {errorRepository: ErrorRepository}) {}

  toBase32<T extends ArrayBuffer = ArrayBuffer>(
    input: T,
    options?: EncodingOptions,
  ): Either<Base32<T>, EncodeError> {
    try {
      return success(
        base32.stringify(new Uint8Array(input), {
          pad: options?.shouldIncludePadding,
        }) as Base32<T>,
      );
    } catch (raw) {
      return error(
        this._root.errorRepository.create({
          kind: ENCODE_ERROR,
          raw,
          description: 'Failed to encode the data in the base32 encoding',
        }),
      );
    }
  }

  fromBase64Url<T extends ArrayBuffer = ArrayBuffer>(
    input: Base64Url<T>,
  ): Either<T, DecodeError> {
    try {
      return success(base64url.parse(input, {loose: true}).buffer as T);
    } catch (raw) {
      return error(
        this._root.errorRepository.create({
          kind: DECODE_ERROR,
          raw,
          description: 'Failed to decode the data from the base64url encoding',
        }),
      );
    }
  }
}
