import {appleAuth} from '@invertase/react-native-apple-authentication';

import {GlobalError, UNKNOWN_ERROR} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {Either, error, success} from '../fp';
import {Disposer, RouterImpl, Service} from '../structure';
import {AppleIdToken} from '../units';
import {
  AppleOAuth2Credentials,
  AppleOAuth2Provider,
} from './AppleOAuth2Provider';
import {ERROR, OAuth2OutcomeMap, REVOKE, SUCCESS} from './OAuth2Provider';

export default class IosAppleOAuth2ProviderService
  implements AppleOAuth2Provider, Service
{
  constructor(
    private readonly _root: {readonly errorRepository: ErrorRepository},
  ) {}

  signIn(): Either<void, GlobalError> {
    try {
      appleAuth
        .performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        })
        .then(_ => {
          if (_.identityToken !== null) {
            this._outcome.send(SUCCESS, {
              idToken: _.identityToken as AppleIdToken,
            });
          } else {
            this._outcome.send(
              ERROR,
              this._root.errorRepository.create({
                kind: UNKNOWN_ERROR,
                description:
                  'The Apple OAuth2 request resolved with a null id token',
              }),
            );
          }
        })
        .catch(_ => {
          this._outcome.send(
            ERROR,
            this._root.errorRepository.create({kind: UNKNOWN_ERROR, raw: _}),
          );
        });
    } catch (raw) {
      return error(
        this._root.errorRepository.create({kind: UNKNOWN_ERROR, raw}),
      );
    }
    return success();
  }

  private readonly _outcome = new RouterImpl<
    OAuth2OutcomeMap<AppleOAuth2Credentials>
  >();

  get outcome(): AppleOAuth2Provider['outcome'] {
    return this._outcome;
  }

  subscribe() {
    return appleAuth.onCredentialRevoked(() => {
      this._outcome.send(REVOKE);
    }) as Disposer | undefined;
  }
}
