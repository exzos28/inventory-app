import {PromiseState} from '../AsyncAtom';
import {GlobalError} from '../Error';
import {Item} from '../ItemRestClientHelper';
import {Either} from '../fp';

export interface FindItemState {
  readonly state: PromiseState<Item[], GlobalError> | undefined;
  fetch(): Promise<Either<void, GlobalError>>;
}
