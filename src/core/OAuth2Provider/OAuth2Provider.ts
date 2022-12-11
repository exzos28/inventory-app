import {GlobalError} from '../Error';
import {RouterSource} from '../structure';
import {Maybe} from '../Maybe';

export interface OAuth2Provider<T> {
  signIn(): Maybe<void>;
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
