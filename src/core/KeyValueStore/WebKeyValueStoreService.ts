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
import {Disposer, RouterImpl, RouterSource, Service} from '../structure';
import {
  AbstractKeyValueMap,
  KeyValueStore,
  UpdatesKeyValueMap,
} from './KeyValueStore';

export default class WebKeyValueStoreService<
  KV extends AbstractKeyValueMap = AbstractKeyValueMap,
> implements KeyValueStore<KV>, Service
{
  constructor(
    private readonly _root: {readonly errorRepository: ErrorRepository},
  ) {}

  async get<K extends keyof KV>(
    key: K,
  ): Promise<Either<KV[K] | undefined, KeyValueStoreGetError>> {
    try {
      const value = localStorage.getItem(String(key));
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
      localStorage.setItem(String(key), value);
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
      localStorage.removeItem(String(key));
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

  subscribe() {
    const listener = (_: StorageEvent) => {
      if (_.storageArea === localStorage && _.key !== null) {
        this._sideUpdates.send(
          _.key,
          _.newValue ?? undefined,
          _.oldValue ?? undefined,
        );
      }
    };
    window.addEventListener('storage', listener);
    return (() => {
      window.removeEventListener('storage', listener);
    }) as Disposer;
  }
}
