import {Opaque} from 'type-fest';

import {GlobalError} from '../Error';
import {Either} from '../fp';
import {Second} from '../Time';

export interface Jwt {
  parse(token: JwtString): Either<JwtSummary, GlobalError>;
}

export type JwtSummary = {
  payload: JwtPayload;
};

export type JwtPayload = {
  sub: JwtSubject;
  exp: Second;
};

export const JWT_SUBJECT = Symbol();
export type JwtSubject = Opaque<string, typeof JWT_SUBJECT>;

export const JWT_STRING = Symbol();
export type JwtString = Opaque<string, typeof JWT_STRING>;
