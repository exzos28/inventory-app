import {GlobalError} from '../Error';
import {Either, success} from '../fp';
import {Jwt, JwtString} from '../Jwt';
import {fromSecond, Millisecond} from '../Time';
import {JwtHelper} from './JwtHelper';

export default class JwtHelperImpl implements JwtHelper {
  constructor(
    private readonly _root: {
      readonly jwt: Jwt;
    },
  ) {}

  isExpired(input: JwtString, now: Millisecond): Either<boolean, GlobalError> {
    const jwt_ = this._root.jwt.parse(input);
    if (!jwt_.success) {
      return jwt_;
    }
    const expiry = fromSecond(jwt_.right.payload.exp);
    return success(now > expiry);
  }
}
