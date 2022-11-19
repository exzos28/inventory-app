import {GoogleIdToken} from '../units';
import {OAuth2Provider} from './OAuth2Provider';

export interface GoogleOAuth2Provider
  extends OAuth2Provider<GoogleOAuth2Credentials> {}

export type GoogleOAuth2Credentials = {
  idToken: GoogleIdToken;
};
