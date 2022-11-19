import {GlobalError} from '../Error';
import {Either} from '../fp';
import {RouterSource} from '../structure';

export interface OAuth2Provider<T> {
  signIn(): Either<void, GlobalError>;
  readonly outcome: RouterSource<OAuth2OutcomeMap<T>>;
}

export const SUCCESS = Symbol();
export const REVOKE = Symbol();
export const ERROR = Symbol();

export type OAuth2OutcomeMap<T> = {
  [SUCCESS]: (credentials: T) => void;
  [REVOKE]: () => void;
  [ERROR]: (error: GlobalError) => void;
};
