import {appleAuthAndroid} from '@invertase/react-native-apple-authentication';

import {Configuration} from '../Configuration';
import {GlobalError, UNKNOWN_ERROR} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {Either, error, success} from '../fp';
import {RouterImpl, Service} from '../structure';
import {AppleIdToken} from '../units';
import {
  AppleOAuth2Credentials,
  AppleOAuth2Provider,
} from './AppleOAuth2Provider';
import {ERROR, OAuth2OutcomeMap, SUCCESS} from './OAuth2Provider';

export default class AndroidAppleOAuth2ProviderService
  implements AppleOAuth2Provider, Service
{
  constructor(
    private readonly _root: {
      readonly configuration: Configuration;
      readonly errorRepository: ErrorRepository;
    },
  ) {}

  signIn(): Either<void, GlobalError> {
    try {
      appleAuthAndroid
        .signIn()
        .then(_ => {
          if (_.id_token !== undefined) {
            this._outcome.send(SUCCESS, {
              idToken: _.id_token as AppleIdToken,
            });
          } else {
            this._outcome.send(
              ERROR,
              this._root.errorRepository.create({
                kind: UNKNOWN_ERROR,
                description:
                  'The Apple OAuth2 request resolved with a undefined id token',
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
    appleAuthAndroid.configure({
      clientId: this._root.configuration.values.appleOauthClientId,
      redirectUri: this._root.configuration.values.appleOauthRedirectUri,
      scope: appleAuthAndroid.Scope.ALL,
      responseType: appleAuthAndroid.ResponseType.ALL,
    });
  }
}
