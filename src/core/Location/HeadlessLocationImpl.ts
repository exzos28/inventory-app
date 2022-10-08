import {Location} from './Location';
import {Linking} from 'react-native';
import {Url} from '../units';
import {success, error, Either} from '../fp';
import {UNKNOWN_ERROR, UnknownError} from '../Error';
import {ErrorRepository} from '../ErrorRepository';

export default class HeadlessLocationImpl implements Location {
  constructor(
    protected readonly _root: {readonly errorRepository: ErrorRepository},
  ) {}

  async open(locator: Url): Promise<Either<void, UnknownError>> {
    try {
      await Linking.openURL(locator);
      return success();
    } catch (raw) {
      return error(
        this._root.errorRepository.create({
          kind: UNKNOWN_ERROR,
          description: 'Opening url failed',
          raw,
        }),
      );
    }
  }

  async canOpen(locator: Url): Promise<Either<boolean, UnknownError>> {
    try {
      return success(await Linking.canOpenURL(locator));
    } catch (raw) {
      return error(
        this._root.errorRepository.create({
          kind: UNKNOWN_ERROR,
          description: 'Checking url failed',
          raw,
        }),
      );
    }
  }
}
