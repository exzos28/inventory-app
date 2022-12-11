import {PromiseState} from '../AsyncAtom';
import {GlobalError} from '../Error';
import {Maybe} from '../Maybe';
import {User} from '../ProjectUsersHelper';

export interface FindUserState {
  readonly state: PromiseState<User[], GlobalError> | undefined;
  fetch(): Promise<Maybe<void>>;
}
