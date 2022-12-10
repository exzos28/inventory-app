import {PromiseState} from '../AsyncAtom';
import {GlobalError} from '../Error';
import {UserResponse} from '../UserRestClient';

export interface AccountStore {
  readonly state: PromiseState<UserResponse, GlobalError> | undefined;
}
