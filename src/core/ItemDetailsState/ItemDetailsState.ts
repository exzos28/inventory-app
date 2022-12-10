import {PromiseState} from '../AsyncAtom';
import {Item} from '../ItemRestClientHelper';
import {GlobalError} from '../Error';
import {Either} from '../fp';

export interface ItemDetailsState {
  readonly state: PromiseState<Item, GlobalError> | undefined;
  fetch(): Promise<Either<void, GlobalError>>;
}
