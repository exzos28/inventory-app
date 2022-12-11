import {GlobalError} from '../Error';
import {Either} from '../fp';
import {JsonString} from '../Json';
import {RouterSource} from '../structure';
import {Maybe} from '../Maybe';

export interface JsonKeyValueStore<
  KV extends AbstractJsonKeyValueMap = AbstractJsonKeyValueMap,
> {
  get<K extends keyof KV>(
    key: K,
  ): Promise<Either<KV[K]['__jsonSerialized__'] | undefined, GlobalError>>;
  set<K extends keyof KV>(
    key: K,
    value: KV[K]['__jsonSerialized__'],
  ): Promise<Maybe<void>>;
  delete<K extends keyof KV>(key: K): Promise<Maybe<void>>;
  readonly sideUpdates: RouterSource<UpdatesJsonKeyValueMap<KV>>;
}

export type AbstractJsonKeyValueMap = {[K in string]: JsonString};

export type UpdatesJsonKeyValueMap<KV extends AbstractJsonKeyValueMap> = {
  [K in keyof KV]: (
    next?: KV[K]['__jsonSerialized__'],
    previous?: KV[K]['__jsonSerialized__'],
  ) => void;
};
