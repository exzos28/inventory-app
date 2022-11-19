import {nanoid} from 'nanoid';

import {Configuration} from '../Configuration';
import {
  GlobalError,
  UNKNOWN_ERROR,
  USER_CANCELLATION_ERROR,
  UserCancellationError,
} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {Either, error, success} from '../fp';
import {Json} from '../Json';
import {Translation} from '../Localization';
import {LocaleTag} from '../Localization/TranslationService';
import {RouterImpl, Service} from '../structure';
import {AppleIdToken, Email} from '../units';
import {
  AppleOAuth2Credentials,
  AppleOAuth2Provider,
} from './AppleOAuth2Provider';
import {ERROR, OAuth2OutcomeMap, SUCCESS} from './OAuth2Provider';

export default class WebAppleOAuth2ProviderService
  implements AppleOAuth2Provider, Service
{
  constructor(
    private readonly _root: {
      readonly errorRepository: ErrorRepository;
      readonly json: Json;
      readonly configuration: Configuration;
      readonly translation: Translation;
    },
  ) {}

  signIn(): Either<void, GlobalError> {
    try {
      AppleID.auth
        .signIn()
        .then(_ => {
          if (_.user) {
            const user_ = this._root.json.stringify(_.user);
            if (user_.success) {
              localStorage.setItem('appleOAuthUser', user_.right);
            }
          }
          this._outcome.send(SUCCESS, {idToken: _.authorization.id_token});
        })
        .catch(_ => {
          let result: GlobalError;
          if (
            WebAppleOAuth2ProviderService._isSignInErrorI(_) &&
            _.error === 'user_cancelled_authorize'
          ) {
            result = this._root.errorRepository.create<UserCancellationError>({
              kind: USER_CANCELLATION_ERROR,
              raw: _,
            });
          } else {
            result = this._root.errorRepository.create({
              kind: UNKNOWN_ERROR,
              raw: _,
            });
          }
          this._outcome.send(ERROR, result);
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
    this._appendScript();
    return undefined;
  }

  private _appendScript() {
    try {
      const source = this._getScriptSource();
      const previous = document.querySelector(`script[src="${source}"]`);
      if (previous !== null) {
        return;
      }
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = source;
      script.addEventListener('load', this._onLoad);
      document.body.appendChild(script);
    } catch (ignore) {}
  }

  private readonly _onLoad = () => {
    AppleID.auth.init({
      clientId: this._root.configuration.values.appleOauthClientId,
      scope: WebAppleOAuth2ProviderService._SCOPE,
      redirectURI: this._getRedirectUri(),
      state: this._getAuthState(),
      nonce: nanoid(),
      usePopup: true,
    });
  };

  private _getRedirectUri() {
    return this._root.configuration.values.appleOauthRedirectUri;
  }

  // noinspection JSMethodCanBeStatic
  private _getAuthState() {
    // fixme l10n
    return 'Initial user authentication request';
  }

  private _getScriptSource() {
    const locale = this._root.translation.localeTag;
    const localeWithRegion =
      WebAppleOAuth2ProviderService.getLocaleWithRegion(locale);
    return `https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/${localeWithRegion}/appleid.auth.js`;
  }

  private static _isSignInErrorI(_: unknown): _ is SignInErrorI {
    return (
      typeof _ === 'object' &&
      _ !== null &&
      typeof Reflect.get(_, 'error') === 'string'
    );
  }

  private static readonly _LOCALE_REGION_MAP = {
    en: 'US',
    de: 'DE',
    pl: 'PL',
  } as const;

  private static getLocaleWithRegion(locale: LocaleTag) {
    const region = WebAppleOAuth2ProviderService._LOCALE_REGION_MAP[locale];
    return `${locale}_${region}`;
  }

  private static readonly _SCOPE = 'name email';
}

declare interface ClientConfigI {
  readonly clientId: string;
  readonly scope: string;
  readonly redirectURI: string;
  readonly state: string;
  readonly nonce?: string;
  readonly usePopup: boolean;
}

declare interface SignInResponseI {
  user?: UserI;
  authorization: AuthorizationI;
}

declare interface SignInErrorI {
  /**
   * @example 'user_cancelled_authorize'
   */
  error: string;
}

declare type UserI = {
  email: Email;
  name: NameI;
};

declare interface AuthorizationI {
  code: string;
  id_token: AppleIdToken;
  state: string;
}

declare type NameI = {
  firstName: string;
  lastName: string;
};

declare interface AuthI {
  readonly auth: {
    init(config: ClientConfigI): void;
    signIn(config?: ClientConfigI): Promise<SignInResponseI>;
  };
}

declare var AppleID: AuthI;
