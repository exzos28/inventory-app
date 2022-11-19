import {JsonString} from '../Json';
import {KeyValueMap} from '../KeyValueStore';

export type JsonKeyValueMap = {
  [K in keyof KeyValueMap]: KeyValueMap[K] extends JsonString
    ? KeyValueMap[K]
    : never;
};
