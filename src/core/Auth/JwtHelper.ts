import {GlobalError} from '../Error';
import {Either} from '../fp';
import {JwtString} from '../Jwt';
import {Millisecond} from '../Time';

export interface JwtHelper {
  isExpired(input: JwtString, now: Millisecond): Either<boolean, GlobalError>;
}
