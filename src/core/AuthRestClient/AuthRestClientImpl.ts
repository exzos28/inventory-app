import {BaseShadesRestClientImpl} from '../BaseShadesRestClient';
import {Configuration} from '../Configuration';
import {GlobalError} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {Either} from '../fp';
import {Fetch} from '../Http';
import {Json} from '../Json';
import {Url} from '../units';
import {
  AuthRestClient,
  AuthResponse,
  OAuth2ProviderMap,
  OAuth2RefreshParams,
  OAuth2SignInParams,
  RefreshResponse,
} from './AuthRestClient';

export default class AuthRestClientImpl
  extends BaseShadesRestClientImpl
  implements AuthRestClient
{
  constructor(
    protected readonly _root: {
      readonly errorRepository: ErrorRepository;
      readonly configuration: Configuration;
      readonly json: Json;
    },
    readonly fetch: Fetch,
  ) {
    super(_root, fetch);
  }

  protected get _base() {
    return this._root.configuration.current.values.shadesRestApiUrl;
  }

  protected get _timeout() {
    return this._root.configuration.current.values.shadesRestApiTimeout;
  }

  async signIn<T extends keyof OAuth2ProviderMap>(
    params: OAuth2SignInParams<T>,
  ): Promise<Either<AuthResponse, GlobalError>> {
    return this._fetch('POST', 'users/oauth' as Url, params);
  }

  async refresh(
    params: OAuth2RefreshParams,
  ): Promise<Either<RefreshResponse, GlobalError>> {
    return this._fetch('POST', 'users/api/token/refresh' as Url, params);
  }
}
