import {FULFILLED} from '../AsyncAtom';
import {AuthRestClient} from '../AuthRestClient';
import {Credentials} from '../Credentials';
import {Fetch, Http} from '../Http';
import {AuthHelper} from './AuthHelper';
import {AUTHORIZED} from './AuthQuery';
import {AuthState} from './AuthState';

export default class AuthedFetchImpl implements Fetch {
  constructor(
    private readonly _root: {
      readonly http: Http;
      readonly authState: AuthState;
      readonly authHelper: AuthHelper;
      readonly authRestClient: AuthRestClient;
    },
  ) {}

  private _getCredentials(): Credentials | null {
    const {latest} = this._root.authState;
    if (latest?.status !== FULFILLED) {
      return null;
    }
    if (latest.result.kind !== AUTHORIZED) {
      return null;
    }
    return latest.result.credentials;
  }

  private _getNewArgs(...args: Parameters<Fetch['fetch']>) {
    const newArgs = [...args] as const;
    const init = newArgs[1] ?? {};
    const newInit = {...init};
    const {accessToken} = this._getCredentials() ?? {};
    newInit.headers = accessToken
      ? {
          ...newInit.headers,
          Authorization: `Bearer ${accessToken}`,
        }
      : newInit.headers;
    // @ts-ignore
    newArgs[1] = newInit;
    return newArgs;
  }

  async fetch(...args: Parameters<Fetch['fetch']>) {
    const newArgs = this._getNewArgs(...args);
    const response = await this._root.http.fetch(...newArgs);

    const {refreshToken} = this._getCredentials() ?? {};

    if (
      !response.success ||
      !(response.right.status === 401) ||
      refreshToken === undefined
    ) {
      return response;
    }

    const refreshResponse = await this._root.authRestClient.refresh({
      token: refreshToken,
    });
    if (refreshResponse.success) {
      await this._root.authHelper.signInByRefreshToken(
        refreshResponse.right.refresh,
      );
    }

    return this._root.http.fetch(...this._getNewArgs(...args));
  }
}
