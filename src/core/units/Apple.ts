import {Opaque} from 'type-fest';

import {JwtString} from '../Jwt';

export const APPLE_ID_TOKEN = Symbol();
export type AppleIdToken = Opaque<JwtString, typeof APPLE_ID_TOKEN>;
