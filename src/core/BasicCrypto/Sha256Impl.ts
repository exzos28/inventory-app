import {
  CryptoDigestAlgorithm,
  CryptoEncoding,
  digestStringAsync,
} from 'expo-crypto';

import {UNKNOWN_ERROR} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {error, success} from '../fp';
import {Maybe} from '../Maybe';
import {HexString, Sha256} from './Sha256';

export default class Sha256Impl implements Sha256 {
  constructor(
    private readonly _root: {
      readonly errorRepository: ErrorRepository;
    },
  ) {}

  async hash(input: string): Promise<Maybe<HexString>> {
    try {
      const result = await digestStringAsync(
        CryptoDigestAlgorithm.SHA256,
        input,
        {encoding: CryptoEncoding.HEX},
      );
      return success(result as HexString);
    } catch (raw) {
      return error(
        this._root.errorRepository.create({
          kind: UNKNOWN_ERROR,
          raw,
        }),
      );
    }
  }
}
