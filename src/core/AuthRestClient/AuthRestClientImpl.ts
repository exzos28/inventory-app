import {BaseShadesRestClientImpl} from '../BaseShadesRestClient';
import {Configuration} from '../Configuration';
import {GlobalError} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {Either} from '../fp';
import {Http} from '../Http';
import {Json} from '../Json';
import {AuthResult, RefreshResult} from '../ShadesServer';
import {Url} from '../units';
import {
  AuthRestClient,
  OAuth2ProviderMap,
  OAuth2RefreshParams,
  OAuth2SignInParams,
} from './AuthRestClient';

export default class AuthRestClientImpl
  extends BaseShadesRestClientImpl
  implements AuthRestClient
{
  constructor(
    protected readonly _root: {
      readonly errorRepository: ErrorRepository;
      readonly configuration: Configuration;
      readonly http: Http;
      readonly json: Json;
    },
  ) {
    super(_root);
  }

  protected get _base() {
    return this._root.configuration.current.values.shadesRestApiUrl;
  }

  protected get _timeout() {
    return this._root.configuration.current.values.shadesRestApiTimeout;
  }

  async signIn<T extends keyof OAuth2ProviderMap>(
    params: OAuth2SignInParams<T>,
  ): Promise<Either<AuthResult, GlobalError>> {
    return this._fetch('POST', 'users/oauth' as Url, params);
  }

  async refresh(
    params: OAuth2RefreshParams,
  ): Promise<Either<RefreshResult, GlobalError>> {
    return this._fetch('POST', 'api/sessions/refresh' as Url, params);
  }
}
