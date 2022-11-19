import {AppleIdToken} from '../units';
import {OAuth2Provider} from './OAuth2Provider';

export interface AppleOAuth2Provider
  extends OAuth2Provider<AppleOAuth2Credentials> {}

export type AppleOAuth2Credentials = {
  idToken: AppleIdToken;
};
