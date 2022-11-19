import {Opaque} from 'type-fest';

import {JwtString} from '../Jwt';

export const ACCESS_TOKEN = Symbol();
export type AccessToken = Opaque<JwtString, typeof ACCESS_TOKEN>;

export const REFRESH_TOKEN = Symbol();
export type RefreshToken = Opaque<JwtString, typeof REFRESH_TOKEN>;
