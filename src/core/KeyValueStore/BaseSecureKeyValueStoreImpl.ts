import {
  deleteItemAsync,
  getItemAsync,
  isAvailableAsync,
  SecureStoreOptions,
  setItemAsync,
} from 'expo-secure-store';

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

export default abstract class BaseSecureKeyValueStoreImpl<
  KV extends AbstractKeyValueMap,
> implements KeyValueStore<KV>
{
  static isAvailable() {
    return isAvailableAsync();
  }

  protected constructor(
    protected readonly _root: {errorRepository: ErrorRepository},
  ) {}

  protected abstract _getOptions<K extends keyof KV>(
    key: K,
  ): SecureStoreOptions | undefined;

  async get<K extends keyof KV>(
    key: K,
  ): Promise<Either<KV[K] | undefined, KeyValueStoreGetError>> {
    try {
      const value = await getItemAsync(String(key), this._getOptions(key));
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
      await setItemAsync(String(key), value, this._getOptions(key));
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
      await deleteItemAsync(String(key), this._getOptions(key));
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
