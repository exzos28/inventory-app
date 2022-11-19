import {SecureStoreOptions} from 'expo-secure-store';

import {ErrorRepository} from '../ErrorRepository';
import BaseSecureKeyValueStoreImpl from './BaseSecureKeyValueStoreImpl';
import {AbstractKeyValueMap, KeyValueStore} from './KeyValueStore';

export default class IosSecureKeyValueStoreImpl<KV extends AbstractKeyValueMap>
  extends BaseSecureKeyValueStoreImpl<KV>
  implements KeyValueStore<KV>
{
  constructor(protected readonly _root: {errorRepository: ErrorRepository}) {
    super(_root);
  }

  protected _getOptions(): SecureStoreOptions | undefined {
    return undefined;
  }
}
