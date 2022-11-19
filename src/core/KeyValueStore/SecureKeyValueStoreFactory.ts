import {Platform} from 'react-native';

import {ErrorRepository} from '../ErrorRepository';
import AndroidSecureKeyValueStoreImpl from './AndroidSecureKeyValueStoreImpl';
import IosSecureKeyValueStoreImpl from './IosSecureKeyValueStoreImpl';

import {AbstractKeyValueMap, KeyValueStore} from './index';

export default class SecureKeyValueStoreFactory<
  KV extends AbstractKeyValueMap,
> {
  constructor(private readonly _root: {errorRepository: ErrorRepository}) {}

  create(): KeyValueStore<KV> {
    if (Platform.OS === 'ios') {
      return new IosSecureKeyValueStoreImpl<KV>(this._root);
    } else {
      return new AndroidSecureKeyValueStoreImpl<KV>(this._root);
    }
  }
}
