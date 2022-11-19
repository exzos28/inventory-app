import {Opaque} from 'type-fest';

import {JwtString} from '../Jwt';

export const GOOGLE_ID_TOKEN = Symbol();
export type GoogleIdToken = Opaque<JwtString, typeof GOOGLE_ID_TOKEN>;
