import {AppLifecycle} from '../AppLifecycle';
import {ErrorRepository} from '../ErrorRepository';
import {Json} from '../Json';
import {Http} from '../Http';
import {KeyValueMap, KeyValueStore} from '../KeyValueStore';
import {JsonKeyValueMap, JsonKeyValueStore} from '../JsonKeyValueStore';
import {Appearance} from '../Appearance';

export interface Core {
  readonly initialized: boolean;
  readonly appLifecycle: AppLifecycle;
  readonly errorRepository: ErrorRepository;
  readonly json: Json;
  readonly http: Http;
  readonly keyValueStore: KeyValueStore<KeyValueMap>;
  readonly jsonKeyValueStore: JsonKeyValueStore<JsonKeyValueMap>;
  readonly appearance: Appearance;
}
