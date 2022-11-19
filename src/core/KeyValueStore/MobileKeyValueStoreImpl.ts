import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  KEY_VALUE_STORE_DELETE_ERROR,
  KEY_VALUE_STORE_GET_ERROR,
  KEY_VALUE_STORE_SET_ERROR,
  KeyValueStoreDeleteError,
  KeyValueStoreGetError,
  KeyValueStoreSetError,
} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {Either, error, success} from '../fp';
import {RouterImpl, RouterSource} from '../structure';
import {
  AbstractKeyValueMap,
  KeyValueStore,
  UpdatesKeyValueMap,
} from './KeyValueStore';

export default class KeyValueStoreImpl<
  KV extends AbstractKeyValueMap = AbstractKeyValueMap,
> implements KeyValueStore<KV>
{
  constructor(
    private readonly _root: {readonly errorRepository: ErrorRepository},
  ) {}

  async get<K extends keyof KV>(
    key: K,
  ): Promise<Either<KV[K] | undefined, KeyValueStoreGetError>> {
    try {
      const value = await AsyncStorage.getItem(String(key));
      return success((value ?? undefined) as KV[K] | undefined);
    } catch (raw) {
      return error(
        this._root.errorRepository.create({
          kind: KEY_VALUE_STORE_GET_ERROR,
          raw,
        }),
      );
    }
  }

  async set<K extends keyof KV>(
    key: K,
    value: KV[K],
  ): Promise<Either<void, KeyValueStoreSetError>> {
    try {
      await AsyncStorage.setItem(String(key), value);
      return success();
    } catch (raw) {
      return error(
        this._root.errorRepository.create({
          kind: KEY_VALUE_STORE_SET_ERROR,
          raw,
        }),
      );
    }
  }

  async delete<K extends keyof KV>(
    key: K,
  ): Promise<Either<void, KeyValueStoreDeleteError>> {
    try {
      await AsyncStorage.removeItem(String(key));
      return success();
    } catch (raw) {
      return error(
        this._root.errorRepository.create({
          kind: KEY_VALUE_STORE_DELETE_ERROR,
          raw,
        }),
      );
    }
  }

  readonly _sideUpdates = new RouterImpl<
    UpdatesKeyValueMap<AbstractKeyValueMap>
  >();

  get sideUpdates() {
    return this._sideUpdates as RouterSource<UpdatesKeyValueMap<KV>>;
  }
}
