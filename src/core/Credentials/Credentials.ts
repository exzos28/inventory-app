import {AccessToken, RefreshToken} from '../units';

export type Credentials = {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
};
