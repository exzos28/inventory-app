import {
  AuthRestClient,
  AuthResponse,
  OAuth2ProviderMap,
  OAuth2RefreshParams,
  OAuth2SignInParams,
  RefreshResponse,
} from '../AuthRestClient';
import {Credentials, RefreshCredentials} from '../Credentials';
import {GlobalError} from '../Error';
import {Either, success} from '../fp';
import {AuthRestClientHelper} from './AuthRestClientHelper';

export default class AuthRestClientHelperImpl implements AuthRestClientHelper {
  constructor(
    private readonly _root: {
      readonly authRestClient: AuthRestClient;
    },
  ) {}

  async refresh(
    params: OAuth2RefreshParams,
  ): Promise<Either<RefreshCredentials, GlobalError>> {
    const outcome = await this._root.authRestClient.refresh(params);
    if (!outcome.success) {
      return outcome;
    }
    return success(
      AuthRestClientHelperImpl._translateRefreshResult(outcome.right),
    );
  }

  async signIn<T extends keyof OAuth2ProviderMap>(
    params: OAuth2SignInParams<T>,
  ): Promise<Either<Credentials, GlobalError>> {
    const outcome = await this._root.authRestClient.signIn(params);
    if (!outcome.success) {
      return outcome;
    }
    return success(
      AuthRestClientHelperImpl._translateAuthResult(outcome.right),
    );
  }

  private static _translateAuthResult(_: AuthResponse): Credentials {
    return {
      refreshToken: _.refresh_token,
      accessToken: _.access_token,
    };
  }
  private static _translateRefreshResult(
    _: RefreshResponse,
  ): RefreshCredentials {
    return {
      accessToken: _.access,
    };
  }
}
