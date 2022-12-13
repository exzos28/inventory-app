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
import {UserId} from '../../../../core/HadesServer';
import {Maybe} from '../../../../core/Maybe';

export default class StocktakingStateImpl {
  private readonly _promiseState: PromiseStateProvider<Item[], GlobalError>;
  private _employeeId?: UserId;

  constructor(
    private readonly _root: {
      readonly itemHelper: ItemHelper;
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

  fetch = bind(async (id: UserId) => {
    this._employeeId = id;
    const response_ = await this._promiseState.fetch();
    if (response_.success) {
      return success();
    }
    return response_;
  }, this);

  private _fetch = bind(async (): Promise<Maybe<Item[]>> => {
    if (!this._employeeId) {
      return error(this._root.errorRepository.create({kind: UNKNOWN_ERROR}));
    }
    return this._root.itemHelper.getAllItemsByEmployee(this._employeeId);
  }, this);
}
