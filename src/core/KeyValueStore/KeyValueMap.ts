import {DeviceId} from '../units';
import {JsonString} from '../Json';
import {AccessToken} from '../LikesFasterServer';

export type KeyValueMap = {
  [K in string]: string;
} & {
  auth: JsonString<AuthRecord>;
  device: JsonString<DeviceRecord>;
};

export type AuthRecord = {
  token: AccessToken;
  prefix: 'Bearer';
};

export type DeviceRecord = {id: DeviceId};
