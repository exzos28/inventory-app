import {PromiseStateProvider} from '../AsyncAtom/PromiseStateProvider';
import {GlobalError} from '../Error';
import {Item, ItemRestClientHelper} from '../ItemRestClientHelper';
import PromiseStateProviderImpl from '../AsyncAtom/PromiseStateProviderImpl';
import {bind, success} from '../fp';
import {computed, makeObservable} from 'mobx';
import {ItemDetailsState} from './ItemDetailsState';
import {ItemId} from '../HadesServer';

export default class ItemDetailsStateImpl implements ItemDetailsState {
  private readonly _promiseState: PromiseStateProvider<Item, GlobalError>;

  constructor(
    private readonly _root: {
      readonly itemRestClientHelper: ItemRestClientHelper;
    },
    public itemId: ItemId,
  ) {
    makeObservable(this);
    this._promiseState = new PromiseStateProviderImpl(this._fetch);
  }

  @computed
  get state() {
    return this._promiseState.state;
  }

  fetch = bind(async () => {
    const response_ = await this._promiseState.fetch();
    if (response_.success) {
      return success();
    }
    return response_;
  }, this);

  private _fetch = bind(() => {
    return this._root.itemRestClientHelper.get({id: this.itemId});
  }, this);
}
