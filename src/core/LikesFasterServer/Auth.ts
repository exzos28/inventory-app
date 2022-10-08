import {Opaque} from 'type-fest';

export type AuthResult = {
  data: {
    token: AccessToken;
    prefix: 'Bearer';
  };
};

export const ACCESS_TOKEN = Symbol();
export type AccessToken = Opaque<string, typeof ACCESS_TOKEN>;
