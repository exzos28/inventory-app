import {AccessToken, RefreshToken} from '../units';

export type AuthResult = {
  access_token: AccessToken;
  refresh_token: RefreshToken;
};

export type RefreshResult = {
  access: AccessToken;
  refresh: RefreshToken;
};
