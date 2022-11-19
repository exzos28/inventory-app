import {action, makeObservable, observable} from 'mobx';

import {FULFILLED, PENDING, REJECTED} from '../AsyncAtom';
import {batchDisposers, Service} from '../structure';
import {AuthClient} from './AuthClient';
import {AuthQuery} from './AuthQuery';
import {AuthState} from './AuthState';

export default class AuthStateService implements AuthState, Service {
  @observable private _initialized = false;
  @observable.ref private _initial?: AuthState['latest'];
  @observable.ref private _latest?: AuthState['latest'];

  constructor(
    private readonly _root: {
      readonly authQuery: AuthQuery;
      readonly authClient: AuthClient;
    },
  ) {
    makeObservable(this);
  }

  get initialized() {
    return this._initialized;
  }

  get latest() {
    return this._latest ?? this._initial;
  }

  private _queryInitialState() {
    this._root.authQuery.query().then(
      action(response_ => {
        if (response_.success) {
          this._initial = {status: FULFILLED, result: response_.right};
        } else {
          this._initial = {status: REJECTED, error: response_.left};
        }
        this._initialized = true;
      }),
    );
  }

  subscribe() {
    this._queryInitialState();

    return batchDisposers(
      this._root.authClient.requests.domain.listen(
        action(event => {
          if (this._latest?.status === PENDING) {
            return;
          }
          this._latest = {
            status: PENDING,
            // TODO This is a TypeScript error
            // @ts-ignore
            params: event,
          };
        }),
      ),
      this._root.authClient.responses.domain.listen(
        action(event => {
          this._latest = {status: FULFILLED, result: event.args[0]};
          this._initialized = true;
        }),
      ),
      this._root.authClient.errors.listen(
        action(_ => {
          this._latest = {status: REJECTED, error: _};
          this._initialized = true;
        }),
      ),
    );
  }
}
