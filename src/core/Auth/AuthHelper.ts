import {BaseOAuth2SignInParams, OAuth2ProviderMap} from '../AuthRestClient';
import {GlobalError} from '../Error';
import {Either} from '../fp';
import {RefreshToken} from '../units';
import {AuthResponse} from './AuthQuery';

export interface AuthHelper {
  fetch(force?: boolean): Promise<Either<AuthResponse, GlobalError>>;
  signInByOAuth2<T extends keyof OAuth2ProviderMap>(
    params: BaseOAuth2SignInParams<T>,
  ): Promise<Either<AuthResponse, GlobalError>>;
  signInByRefreshToken(
    token: RefreshToken,
  ): Promise<Either<AuthResponse, GlobalError>>;
  touch(): Promise<Either<AuthResponse, GlobalError>>;
  signOut(): Promise<Either<AuthResponse, GlobalError>>;
}
