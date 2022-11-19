import {BaseOAuth2SignInParams, OAuth2ProviderMap} from '../AuthRestClient';
import {GlobalError} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {Either, error, success} from '../fp';
import {BusHelperImpl} from '../structure';
import {RefreshToken} from '../units';
import {
  AuthClient,
  AuthRequestMap,
  REFRESH,
  SIGN_IN_BY_OAUTH2,
  SIGN_IN_BY_REFRESH_TOKEN,
  SIGN_OUT,
  TOUCH,
} from './AuthClient';
import {AuthHelper} from './AuthHelper';
import {AuthResponse} from './AuthQuery';

export default class AuthHelperImpl implements AuthHelper {
  private readonly _responseHelper;
  private readonly _errorHelper;

  constructor(
    private readonly _root: {
      readonly errorRepository: ErrorRepository;
      readonly authClient: AuthClient;
    },
  ) {
    this._responseHelper = new BusHelperImpl(
      _root,
      _root.authClient.responses.domain,
    );
    this._errorHelper = new BusHelperImpl(_root, _root.authClient.errors);
  }

  async fetch(force?: boolean): Promise<Either<AuthResponse, GlobalError>> {
    return this._query(REFRESH, force);
  }

  async signInByOAuth2<T extends keyof OAuth2ProviderMap>(
    params: BaseOAuth2SignInParams<T>,
  ): Promise<Either<AuthResponse, GlobalError>> {
    return this._query(SIGN_IN_BY_OAUTH2, params);
  }

  async signInByRefreshToken(
    token: RefreshToken,
  ): Promise<Either<AuthResponse, GlobalError>> {
    return this._query(SIGN_IN_BY_REFRESH_TOKEN, token);
  }

  async touch(): Promise<Either<AuthResponse, GlobalError>> {
    return this._query(TOUCH);
  }

  async signOut(): Promise<Either<AuthResponse, GlobalError>> {
    return this._query(SIGN_OUT);
  }

  private async _query<T extends keyof AuthRequestMap>(
    theme: T,
    ...args: Parameters<AuthRequestMap[T]>
  ): Promise<Either<AuthResponse, GlobalError>> {
    const responsePromise = this._responseHelper.when();
    const errorPromise = this._errorHelper.when();
    this._root.authClient.requests.send(theme, ...args);
    const outcome_ = await Promise.race([
      responsePromise.then(_ => (_.success ? success(_.right[0]) : _)),
      errorPromise.then(_ => (_.success ? error(_.right[0]) : _)),
    ]);
    responsePromise.cancel();
    errorPromise.cancel();
    if (!outcome_.success) {
      return outcome_;
    }
    return success(outcome_.right.args[0]);
  }
}
