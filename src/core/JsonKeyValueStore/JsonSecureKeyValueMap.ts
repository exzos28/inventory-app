import {JsonString} from '../Json';
import {SecureKeyValueMap} from '../KeyValueStore';

export type JsonSecureKeyValueMap = {
  [K in keyof SecureKeyValueMap]: SecureKeyValueMap[K] extends JsonString
    ? SecureKeyValueMap[K]
    : never;
};
