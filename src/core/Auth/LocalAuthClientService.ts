import {BaseOAuth2SignInParams, OAuth2ProviderMap} from '../AuthRestClient';
import {Credentials} from '../Credentials';
import {GlobalError, UNKNOWN_ERROR} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {Either} from '../fp';
import {JsonKeyValueStore, JsonSecureKeyValueMap} from '../JsonKeyValueStore';
import {
  BusImpl,
  BusSource,
  RouterImpl,
  RouterSource,
  Service,
} from '../structure';
import {Time} from '../Time';
import {RefreshToken} from '../units';
import {
  AuthClient,
  AuthRequestMap,
  AuthResponseMap,
  REFRESH,
  SIGN_IN_BY_OAUTH2,
  SIGN_IN_BY_REFRESH_TOKEN,
  SIGN_OUT,
  TOUCH,
} from './AuthClient';
import {
  AUTHORIZED,
  AuthQuery,
  NO_LOCAL_RECORD,
  UNAUTHORIZED,
} from './AuthQuery';
import {AuthRestClientHelper} from './AuthRestClientHelper';
import {JwtHelper} from './JwtHelper';

export default class LocalAuthClientService implements AuthClient, Service {
  private _busy = false;
  readonly requests = new RouterImpl<AuthRequestMap>();
  private readonly _responses = new RouterImpl<AuthResponseMap>();
  private readonly _errors = new BusImpl<(_: GlobalError) => any>();

  constructor(
    private readonly _root: {
      readonly errorRepository: ErrorRepository;
      readonly time: Time;
      readonly jwtHelper: JwtHelper;
      readonly jsonSecureKeyValueStore: JsonKeyValueStore<JsonSecureKeyValueMap>;
      readonly authRestClientHelper: AuthRestClientHelper;
      readonly authQuery: AuthQuery;
    },
  ) {}

  get responses(): RouterSource<AuthResponseMap> {
    return this._responses;
  }

  get errors(): BusSource<(_: GlobalError) => any> {
    return this._errors;
  }

  subscribe() {
    return this.requests.domain.listen(event => {
      switch (event.theme) {
        case REFRESH:
          return this._onRefresh(...event.args);
        case SIGN_IN_BY_OAUTH2:
          return this._onSignInByOAuth2(...event.args);
        case SIGN_IN_BY_REFRESH_TOKEN:
          return this._onSignInByRefreshToken(...event.args);
        case TOUCH:
          return this._onTouch(...event.args);
        case SIGN_OUT:
          return this._onSignOut(...event.args);
      }
    });
  }

  private readonly _onRefresh = (force?: boolean) => {
    return this._guard(async () => {
      const now = this._root.time.now();
      const response_ = await this._root.authQuery.query();
      if (!response_.success) {
        return this._errors.send(response_.left);
      }
      const response = response_.right;
      switch (response.kind) {
        case UNAUTHORIZED:
          return this._responses.send(UNAUTHORIZED, response);
      }
      if (!force) {
        const isExpired_ = this._root.jwtHelper.isExpired(
          response.credentials.accessToken,
          now,
        );
        if (!isExpired_.success) {
          return this._errors.send(isExpired_.left);
        }
        if (!isExpired_.right) {
          return this._responses.send(AUTHORIZED, response);
        }
      }
      await this._refreshCredentials(response.credentials.refreshToken);
    });
  };

  private readonly _onSignInByOAuth2 = <T extends keyof OAuth2ProviderMap>(
    params: BaseOAuth2SignInParams<T>,
  ) => {
    return this._guard(async () => {
      const credentials_ = await this._root.authRestClientHelper.signIn({
        ...params,
      });
      await this._processFreshCredentials(credentials_);
    });
  };

  private readonly _onSignInByRefreshToken = (token: RefreshToken) => {
    return this._guard(async () => {
      await this._refreshCredentials(token);
    });
  };

  private readonly _onTouch = () => {
    return this._guard(async () => {
      const response_ = await this._root.authQuery.query();
      if (!response_.success) {
        return this._errors.send(response_.left);
      }
      const response = response_.right;
      if (response.kind === UNAUTHORIZED) {
        return this._errors.send(
          this._root.errorRepository.create({
            kind: UNKNOWN_ERROR,
            description: 'Cannot touch unauthorized state',
          }),
        );
      }
      const credentials: Credentials = response.credentials;
      const set_ = await this._root.jsonSecureKeyValueStore.set(
        'auth2',
        credentials,
      );
      if (!set_.success) {
        return this._errors.send(set_.left);
      }
      return this._responses.send(AUTHORIZED, {
        kind: AUTHORIZED,
        credentials,
      });
    });
  };

  private readonly _onSignOut = () => {
    return this._guard(async () => {
      const delete_ = await this._root.jsonSecureKeyValueStore.delete('auth2');
      if (!delete_.success) {
        return this._errors.send(delete_.left);
      }
      return this._responses.send(UNAUTHORIZED, {
        kind: UNAUTHORIZED,
        reason: NO_LOCAL_RECORD,
      });
    });
  };

  private async _refreshCredentials(_: RefreshToken) {
    const credentials_ = await this._root.authRestClientHelper.refresh({
      token: _,
    });
    await this._processFreshCredentials(credentials_);
  }

  private async _processFreshCredentials(
    credentials_: Either<Credentials, GlobalError>,
  ) {
    if (!credentials_.success) {
      return this._errors.send(credentials_.left);
    }
    const set_ = await this._root.jsonSecureKeyValueStore.set(
      'auth2',
      credentials_.right,
    );
    if (!set_.success) {
      return this._errors.send(set_.left);
    }
    return this._responses.send(AUTHORIZED, {
      kind: AUTHORIZED,
      credentials: credentials_.right,
    });
  }

  private async _guard(op: () => Promise<any>) {
    if (this._busy) {
      return;
    }
    this._busy = true;
    try {
      await op();
    } finally {
      this._busy = false;
    }
  }
}
