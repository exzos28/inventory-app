import {PromiseStateProvider} from '../AsyncAtom/PromiseStateProvider';
import {GlobalError, UNKNOWN_ERROR, UnknownError} from '../Error';
import {ItemHelperImpl} from '../ItemHelper';
import PromiseStateProviderImpl from '../AsyncAtom/PromiseStateProviderImpl';
import {bind, error, success} from '../fp';
import {computed, makeObservable} from 'mobx';
import {DetailedItem, ItemDetailsState} from './ItemDetailsState';
import {ItemId} from '../HadesServer';
import {ProjectUsersHelper} from '../ProjectUsersHelper';
import {ErrorRepository} from '../ErrorRepository';

export default class ItemDetailsStateImpl implements ItemDetailsState {
  private readonly _promiseState: PromiseStateProvider<
    DetailedItem,
    GlobalError
  >;
  private _selectedItemId?: ItemId;

  constructor(
    private readonly _root: {
      readonly itemHelper: ItemHelperImpl;
      readonly projectUsersHelper: ProjectUsersHelper;
      readonly errorRepository: ErrorRepository;
    },
  ) {
    makeObservable(this);
    this._promiseState = new PromiseStateProviderImpl(this._fetch);
  }

  @computed
  get state() {
    return this._promiseState.state;
  }

  fetch = bind(async (id: ItemId) => {
    this._selectedItemId = id;
    const response_ = await this._promiseState.fetch();
    if (response_.success) {
      return success();
    }
    return response_;
  }, this);

  private _fetch = bind(async () => {
    if (!this._selectedItemId) {
      return error(
        this._root.errorRepository.create<UnknownError>({kind: UNKNOWN_ERROR}),
      );
    }
    const item_ = await this._root.itemHelper.get({id: this._selectedItemId});
    if (!item_.success) {
      return item_;
    }
    const itemOwner = item_.right.employee;
    const user_ = itemOwner
      ? await this._root.projectUsersHelper.getUserById(itemOwner)
      : undefined;
    return success({
      item: item_.right,
      owner: user_?.success ? user_.right : undefined,
    });
  }, this);
}
