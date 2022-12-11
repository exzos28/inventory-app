import {GlobalError} from '../Error';
import {Either} from '../fp';
import {RouterSource} from '../structure';
import {Maybe} from '../Maybe';

export interface KeyValueStore<
  KV extends AbstractKeyValueMap = AbstractKeyValueMap,
> {
  get<K extends keyof KV>(
    key: K,
  ): Promise<Either<KV[K] | undefined, GlobalError>>;
  set<K extends keyof KV>(key: K, value: KV[K]): Promise<Maybe<void>>;
  delete<K extends keyof KV>(key: K): Promise<Maybe<void>>;
  readonly sideUpdates: RouterSource<UpdatesKeyValueMap<KV>>;
}

export type AbstractKeyValueMap = {[K in string]: string};

export type UpdatesKeyValueMap<KV extends AbstractKeyValueMap> = {
  [K in keyof KV]: (next?: KV[K], previous?: KV[K]) => void;
};
