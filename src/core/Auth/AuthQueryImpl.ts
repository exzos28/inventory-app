import {GlobalError} from '../Error';
import {Either, success} from '../fp';
import {JsonKeyValueStore, JsonSecureKeyValueMap} from '../JsonKeyValueStore';
import {Time} from '../Time';
import {
  AUTHORIZED,
  AuthQuery,
  AuthResponse,
  NO_LOCAL_RECORD,
  RECORD_EXPIRED,
  UNAUTHORIZED,
} from './AuthQuery';
import {JwtHelper} from './JwtHelper';

export default class AuthQueryImpl implements AuthQuery {
  constructor(
    private readonly _root: {
      readonly time: Time;
      readonly jwtHelper: JwtHelper;
      readonly jsonSecureKeyValueStore: JsonKeyValueStore<JsonSecureKeyValueMap>;
    },
  ) {}

  async query(): Promise<Either<AuthResponse, GlobalError>> {
    const now = this._root.time.now();
    const get_ = await this._root.jsonSecureKeyValueStore.get('auth2');
    if (!get_.success) {
      return get_;
    }
    if (!get_.right || get_.right.refreshToken === undefined) {
      return success({kind: UNAUTHORIZED, reason: NO_LOCAL_RECORD});
    }
    const credentials = get_.right;
    const isExpired_ = this._root.jwtHelper.isExpired(
      credentials.refreshToken,
      now,
    );
    if (!isExpired_.success) {
      return isExpired_;
    }
    if (isExpired_.right) {
      return success({kind: UNAUTHORIZED, reason: RECORD_EXPIRED});
    }
    return success({kind: AUTHORIZED, credentials});
  }
}
