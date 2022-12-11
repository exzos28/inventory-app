import {GlobalError} from '../Error';
import {Either} from '../fp';
import {Json, JsonSerializable} from '../Json';
import {KeyValueStore} from '../KeyValueStore';
import {RouterImpl, RouterSource, Service} from '../structure';
import {
  AbstractJsonKeyValueMap,
  JsonKeyValueStore,
  UpdatesJsonKeyValueMap,
} from './JsonKeyValueStore';
import {Maybe} from '../Maybe';

export default class JsonKeyValueStoreService<
  KV extends AbstractJsonKeyValueMap = AbstractJsonKeyValueMap,
> implements JsonKeyValueStore<KV>, Service
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

  readonly _sideUpdates = new RouterImpl<
    UpdatesJsonKeyValueMap<AbstractJsonKeyValueMap>
  >();

  get sideUpdates() {
    return this._sideUpdates as RouterSource<UpdatesJsonKeyValueMap<KV>>;
  }

  subscribe() {
    return this._store.sideUpdates.domain.listen(event => {
      if (this._sideUpdates.getListeners(String(event.theme)).size === 0) {
        return;
      }
      const [next, previous] = event.args;
      let jsonNext: JsonSerializable | undefined;
      if (next !== undefined) {
        const next_ = this._root.json.parse(next);
        if (!next_.success) {
          return;
        }
        jsonNext = next_.right;
      }
      let jsonPrevious: JsonSerializable | undefined;
      if (previous !== undefined) {
        const previous_ = this._root.json.parse(previous);
        if (!previous_.success) {
          return;
        }
        jsonPrevious = previous_.right;
      }
      this._sideUpdates.send(String(event.theme), jsonNext, jsonPrevious);
    });
  }
}
