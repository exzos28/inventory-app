import {PromiseState} from '../AsyncAtom';
import {GlobalError} from '../Error';
import {RouterMapEvents} from '../structure';
import {AuthRequestMap} from './AuthClient';
import {AuthResponse} from './AuthQuery';

export interface AuthState {
  readonly initialized: boolean;
  readonly latest:
    | PromiseState<AuthResponse, GlobalError, RouterMapEvents<AuthRequestMap>>
    | undefined;
}
