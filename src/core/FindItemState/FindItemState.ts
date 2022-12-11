import {PromiseState} from '../AsyncAtom';
import {GlobalError} from '../Error';
import {Item} from '../ItemHelper';
import {Maybe} from '../Maybe';

export interface FindItemState {
  readonly state: PromiseState<Item[], GlobalError> | undefined;
  fetch(): Promise<Maybe<void>>;
}
