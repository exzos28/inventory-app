import {Platform} from 'react-native';

import {ErrorRepository} from '../ErrorRepository';
import AndroidHttpImpl from './AndroidHttpImpl';
import {Http} from './Http';
import HttpImpl from './HttpImpl';

export default class MobileHttpFactory {
  constructor(
    private readonly _root: {readonly errorRepository: ErrorRepository},
  ) {}

  create(): Http {
    if (Platform.OS === 'android') {
      return new AndroidHttpImpl(this._root);
    }
    return new HttpImpl(this._root);
  }
}
