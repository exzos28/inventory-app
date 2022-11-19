import {Url} from '../units';
import {Millisecond} from '../Time';

export type ConfigurationValues = {
  shadesRestApiUrl: Url;
  shadesRestApiTimeout: Millisecond;
  googleMobileOauthClientId: string;
  googleWebOauthClientId: string;
  appleOauthClientId: string;
  appleOauthRedirectUri: string;
};
