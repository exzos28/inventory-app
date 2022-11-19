import {TextBuffer, TextEndec} from './TextEndec';
import {Either, error, success} from '../fp';
import {ErrorRepository} from '../ErrorRepository';
import {DECODE_ERROR, DecodeError} from '../Error';

export default class TextEndecImpl implements TextEndec {
  constructor(
    private readonly _root: {readonly errorRepository: ErrorRepository},
  ) {}

  decode<T extends string>(input: TextBuffer<T>): Either<T, DecodeError> {
    try {
      const decoder = new TextDecoder('utf-8', {fatal: true});
      return success(decoder.decode(input) as T);
    } catch (raw) {
      return error(
        this._root.errorRepository.create({
          kind: DECODE_ERROR,
          raw,
          description: 'Failed to decode the data from utf-8 encoding',
        }),
      );
    }
  }
}
