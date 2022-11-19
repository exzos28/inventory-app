import {Credentials} from '../Credentials';
import {GlobalError} from '../Error';
import {Either} from '../fp';

export interface AuthQuery {
  query(): Promise<Either<AuthResponse, GlobalError>>;
}

export const UNAUTHORIZED = Symbol.for('Unauthorized');
export const AUTHORIZED = Symbol.for('Authorized');

export type AuthResponse = UnauthorizedResponse | AuthorizedResponse;

export type UnauthorizedResponse = {
  kind: typeof UNAUTHORIZED;
  reason: UnauthorizedResponseReason;
};

export type AuthorizedResponse = {
  kind: typeof AUTHORIZED;
  credentials: Credentials;
};

export const NO_LOCAL_RECORD = Symbol.for('No local record');
export const RECORD_EXPIRED = Symbol.for('Record expired');

export type UnauthorizedResponseReason =
  | typeof NO_LOCAL_RECORD
  | typeof RECORD_EXPIRED;
