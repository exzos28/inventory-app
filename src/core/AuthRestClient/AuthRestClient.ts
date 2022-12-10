import {RestClient} from '../BaseRestClient';
import {GlobalError} from '../Error';
import {Either} from '../fp';
import {AccessToken, AppleIdToken, GoogleIdToken, RefreshToken} from '../units';

export interface AuthRestClient extends RestClient {
  signIn<T extends keyof OAuth2ProviderMap>(
    params: OAuth2SignInParams<T>,
  ): Promise<Either<AuthResponse, GlobalError>>;
  refresh(
    params: OAuth2RefreshParams,
  ): Promise<Either<RefreshResponse, GlobalError>>;
}

export type OAuth2RefreshParams = {
  token: RefreshToken;
};

export type OAuth2SignInParams<T extends keyof OAuth2ProviderMap> =
  BaseOAuth2SignInParams<T>;

export type BaseOAuth2SignInParams<T extends keyof OAuth2ProviderMap> = {
  provider: T;
  id_token: OAuth2ProviderMap[T];
};

export type OAuth2ProviderMap = {
  google: GoogleIdToken;
  apple: AppleIdToken;
};

export type AuthResponse = {
  access_token: AccessToken;
  refresh_token: RefreshToken;
};
export type RefreshResponse = {
  access: AccessToken;
  refresh: RefreshToken;
};
