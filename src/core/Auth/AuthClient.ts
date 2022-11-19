import {BaseOAuth2SignInParams, OAuth2ProviderMap} from '../AuthRestClient';
import {GlobalError} from '../Error';
import {BusSource, Router, RouterSource} from '../structure';
import {RefreshToken} from '../units';
import {
  AUTHORIZED,
  AuthorizedResponse,
  UNAUTHORIZED,
  UnauthorizedResponse,
} from './AuthQuery';

export interface AuthClient {
  readonly requests: Router<AuthRequestMap>;
  readonly responses: RouterSource<AuthResponseMap>;
  readonly errors: BusSource<(_: GlobalError) => any>;
}

export const REFRESH = Symbol();
export const SIGN_IN_BY_OAUTH2 = Symbol();
export const SIGN_IN_BY_REFRESH_TOKEN = Symbol();
export const TOUCH = Symbol();
export const SIGN_OUT = Symbol();

export type AuthRequestMap = {
  [REFRESH]: (force?: boolean) => any;
  [SIGN_IN_BY_OAUTH2]: <T extends keyof OAuth2ProviderMap>(
    params: BaseOAuth2SignInParams<T>,
  ) => any;
  [SIGN_IN_BY_REFRESH_TOKEN]: (token: RefreshToken) => any;
  [TOUCH]: () => any;
  [SIGN_OUT]: () => any;
};

export type AuthResponseMap = {
  [UNAUTHORIZED]: (_: UnauthorizedResponse) => any;
  [AUTHORIZED]: (_: AuthorizedResponse) => any;
};
