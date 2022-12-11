import {PromiseState} from '../AsyncAtom';
import {Item} from '../ItemHelper';
import {GlobalError} from '../Error';
import {Maybe} from '../Maybe';
import {User} from '../ProjectUsersHelper';
import {ItemId} from '../HadesServer';

export interface ItemDetailsState {
  readonly state: PromiseState<DetailedItem, GlobalError> | undefined;
  fetch(id: ItemId): Promise<Maybe<void>>;
}

export type DetailedItem = {
  item: Item;
  owner?: User;
};
