import {Item, ItemHelper} from '../../core/ItemHelper';
import {ProjectUsersHelper, User} from '../../core/ProjectUsersHelper';
import {ItemId, UserId} from '../../core/HadesServer';
import PromiseStateProviderImpl from '../../core/AsyncAtom/PromiseStateProviderImpl';
import {PromiseStateProvider} from '../../core/AsyncAtom/PromiseStateProvider';
import {
  bind,
  error,
  ErrorRepository,
  FULFILLED,
  GlobalError,
  success,
  UNKNOWN_ERROR,
  UnknownError,
} from '../../core';
import {Maybe} from '../../core/Maybe';

export default class ConfirmItemsTransferState {
  private readonly _promiseState: PromiseStateProvider<
    {items: Item[]; user: User},
    GlobalError
  >;
  private _selectedIds: ItemId[] = [];
  private _selectedUserId?: UserId;

  constructor(
    private readonly _root: {
      readonly itemHelper: ItemHelper;
      readonly projectUsersHelper: ProjectUsersHelper;
      readonly errorRepository: ErrorRepository;
    },
  ) {
    this._promiseState = new PromiseStateProviderImpl(this._fetch);
  }

  private _fetch = bind(async () => {
    const itemsResponse_ = await this._root.itemHelper.getAll();
    if (!itemsResponse_.success) {
      return itemsResponse_;
    }
    const items = itemsResponse_.right.filter(_ =>
      this._selectedIds.includes(_.id),
    );
    if (!this._selectedUserId) {
      return error(
        this._root.errorRepository.create<UnknownError>({kind: UNKNOWN_ERROR}),
      );
    }
    const userResponse_ = await this._root.projectUsersHelper.getUserById(
      this._selectedUserId,
    );
    if (!userResponse_.success) {
      return userResponse_;
    }
    return success({items, user: userResponse_.right});
  }, this);

  async fetch(itemIds: ItemId[], userId: UserId) {
    this._selectedIds = itemIds;
    this._selectedUserId = userId;
    await this._promiseState.fetch();
  }

  accept = bind(async (): Promise<Maybe<void>> => {
    if (this.state?.status !== FULFILLED) {
      return error(this._root.errorRepository.create({kind: UNKNOWN_ERROR}));
    }
    const itemIds = this.state.result.items.map(_ => _.id);
    const userId = this.state.result.user.id;
    for (const itemId of itemIds) {
      await this._root.itemHelper.update({
        id: itemId,
        item: {employee: userId},
      });
    }
    return success();
  }, this);

  get state() {
    return this._promiseState.state;
  }
}
