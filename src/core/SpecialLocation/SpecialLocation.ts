import {Url} from '../units';

export interface SpecialLocation {
  getOauthRedirect(): Url;
  parse(locator: Url): SpecialLocator;
}

export const UNKNOWN = Symbol();
export const OAUTH_REDIRECT = Symbol();
export const EXTERNAL = Symbol();

export interface Unknown {
  kind: typeof UNKNOWN;
}

export interface OauthRedirect {
  kind: typeof OAUTH_REDIRECT;
}

export interface External {
  kind: typeof EXTERNAL;
}

export type SpecialLocator = Unknown | OauthRedirect | External;
