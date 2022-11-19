import {HexString} from '../BasicCrypto';
import {Credentials} from '../Credentials';
import {JsonString} from '../Json';

export type SecureKeyValueMap = {
  auth: never;
  auth2: JsonString<Credentials>;
  identity: never;
  identity2: JsonString<IdentityRecord>;
};

export type IdentityRecord = {
  pinCodeHash: HexString;
  biometricsEnabled: boolean;
};
