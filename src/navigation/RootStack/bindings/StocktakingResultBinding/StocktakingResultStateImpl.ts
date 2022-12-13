import {computed, makeObservable} from 'mobx';
import {PromiseStateProvider} from '../../../../core/AsyncAtom/PromiseStateProvider';
import {Item, ItemHelper} from '../../../../core/ItemHelper';
import {
  bind,
  error,
  ErrorRepository,
  GlobalError,
  success,
  UNKNOWN_ERROR,
} from '../../../../core';
import PromiseStateProviderImpl from '../../../../core/AsyncAtom/PromiseStateProviderImpl';
import {ItemId, UserId} from '../../../../core/HadesServer';
import {Maybe} from '../../../../core/Maybe';

export default class StocktakingResultStateImpl {
  private readonly _notFoundItemsState: PromiseStateProvider<
    Item[],
    GlobalError
  >;
  private _employeeId?: UserId;
  private _selectedItems?: ItemId[];

  constructor(
    private readonly _root: {
      readonly itemHelper: ItemHelper;
      readonly errorRepository: ErrorRepository;
    },
  ) {
    makeObservable(this);
    this._notFoundItemsState = new PromiseStateProviderImpl(this._fetch);
  }

  @computed
  get state() {
    return this._notFoundItemsState.state;
  }

  fetch = bind(async (id: UserId, items: ItemId[]) => {
    this._employeeId = id;
    this._selectedItems = items;
    const response_ = await this._notFoundItemsState.fetch();
    if (response_.success) {
      return success();
    }
    return response_;
  }, this);

  private _fetch = bind(async (): Promise<Maybe<Item[]>> => {
    if (!this._employeeId || this._selectedItems === undefined) {
      return error(this._root.errorRepository.create({kind: UNKNOWN_ERROR}));
    }
    const items_ = await this._root.itemHelper.getAllItemsByEmployee(
      this._employeeId,
    );
    if (!items_.success) {
      return items_;
    }

    const notFoundItems = items_.right.filter(
      _ => !this._selectedItems?.includes(_.id),
    );
    return success(notFoundItems);
  }, this);
}
