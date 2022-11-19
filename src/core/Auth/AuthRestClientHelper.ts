import {
  OAuth2ProviderMap,
  OAuth2RefreshParams,
  OAuth2SignInParams,
} from '../AuthRestClient';
import {Credentials} from '../Credentials';
import {GlobalError} from '../Error';
import {Either} from '../fp';

export interface AuthRestClientHelper {
  refresh(
    params: OAuth2RefreshParams,
  ): Promise<Either<Credentials, GlobalError>>;
  signIn<T extends keyof OAuth2ProviderMap>(
    params: OAuth2SignInParams<T>,
  ): Promise<Either<Credentials, GlobalError>>;
}
