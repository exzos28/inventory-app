import {FindItemState} from './FindItemState';
import {PromiseStateProvider} from '../AsyncAtom/PromiseStateProvider';
import {GlobalError} from '../Error';
import {Item, ItemHelper} from '../ItemHelper';
import PromiseStateProviderImpl from '../AsyncAtom/PromiseStateProviderImpl';
import {bind, success} from '../fp';
import {computed, makeObservable} from 'mobx';

export default class FindItemStateImpl implements FindItemState {
  private readonly _promiseState: PromiseStateProvider<Item[], GlobalError>;

  constructor(
    private readonly _root: {
      readonly itemHelper: ItemHelper;
    },
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
    return this._root.itemHelper.getAll();
  }, this);
}
