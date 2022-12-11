import {FindUserState} from './FindUserState';
import {PromiseStateProvider} from '../AsyncAtom/PromiseStateProvider';
import {GlobalError} from '../Error';
import PromiseStateProviderImpl from '../AsyncAtom/PromiseStateProviderImpl';
import {bind, success} from '../fp';
import {computed, makeObservable} from 'mobx';
import {ProjectUsersHelper, User} from '../ProjectUsersHelper';

export default class FindUserStateImpl implements FindUserState {
  private readonly _promiseState: PromiseStateProvider<User[], GlobalError>;

  constructor(
    private readonly _root: {
      readonly projectUsersHelper: ProjectUsersHelper;
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
    return this._root.projectUsersHelper.getUsers();
  }, this);
}
