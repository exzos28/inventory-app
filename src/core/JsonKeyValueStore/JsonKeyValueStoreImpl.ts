import {KeyValueStore} from '../KeyValueStore';
import {Either} from '../fp';
import {AbstractJsonKeyValueMap, JsonKeyValueStore} from './JsonKeyValueStore';
import {Json} from '../Json';
import {GlobalError} from '../Error';

export default class JsonKeyValueStoreImpl<
  KV extends AbstractJsonKeyValueMap = AbstractJsonKeyValueMap,
> implements JsonKeyValueStore<KV>
{
  constructor(
    private readonly _root: {readonly json: Json},
    private readonly _store: KeyValueStore<KV>,
  ) {}

  async get<K extends keyof KV>(
    key: K,
  ): Promise<Either<KV[K]['__jsonSerialized__'] | undefined, GlobalError>> {
    const value_ = await this._store.get(key);
    if (!value_.success || value_.right === undefined) {
      return value_;
    }
    return this._root.json.parse(value_.right);
  }

  async set<K extends keyof KV>(
    key: K,
    value: KV[K]['__jsonSerialized__'],
  ): Promise<Maybe<void>> {
    const stringify_ = this._root.json.stringify(value);
    if (!stringify_.success) {
      return stringify_;
    }
    return this._store.set(key, stringify_.right as KV[K]);
  }

  async delete<K extends keyof KV>(key: K): Promise<Maybe<void>> {
    return this._store.delete(key);
  }
}
