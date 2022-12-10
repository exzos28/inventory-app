import {AccountStore} from './AccountStore';
import {action, makeObservable, observable} from 'mobx';
import {batchDisposers, Service} from '../structure';
import {AuthClient, AuthHelper, AUTHORIZED} from '../Auth';
import {ErrorRepository} from '../ErrorRepository';
import {UserRestClient} from '../UserRestClient';
import {FULFILLED, PENDING, REJECTED} from '../AsyncAtom';

export default class AccountStoreService implements AccountStore, Service {
  @observable.ref private _state?: AccountStore['state'];

  constructor(
    private readonly _root: {
      readonly errorRepository: ErrorRepository;
      readonly authClient: AuthClient;
      readonly authHelper: AuthHelper;
      readonly userRestClient: UserRestClient;
    },
  ) {
    makeObservable(this);
  }

  private _setState = action((state?: AccountStore['state']) => {
    this._state = state;
  });

  get state() {
    return this._state;
  }

  private _authorizeOnInit() {
    return this._root.authHelper.fetch();
  }

  private _fetchOnAuthorized() {
    this._setState({status: PENDING});
    return this._root.authClient.responses.listen(AUTHORIZED, _ => {
      this._root.userRestClient.me().then(response_ => {
        if (!response_.success) {
          this._setState({status: REJECTED, error: response_.left});
        } else {
          this._setState({status: FULFILLED, result: response_.right});
        }
      });
    });
  }

  subscribe() {
    // noinspection JSIgnoredPromiseFromCall
    this._authorizeOnInit();
    return batchDisposers(this._fetchOnAuthorized());
  }
}
