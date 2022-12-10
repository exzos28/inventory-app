import {AUTHORIZED, AuthState} from '../Auth';
import {FULFILLED} from '../AsyncAtom';
import {AppStateHelper} from './AppStateHelper';
import {expr} from 'mobx-utils';
import {AccountStore} from '../AccountStore';

export class AppStateHelperImpl implements AppStateHelper {
  constructor(
    private readonly _root: {
      readonly authState: AuthState;
      readonly accountStore: AccountStore;
    },
  ) {}

  isReady = (): boolean => {
    return expr(() => {
      const authState = this._root.authState.latest;
      const accountStoreState = this._root.accountStore.state;

      // TODO add internal error
      return (
        authState?.status === FULFILLED &&
        authState.result.kind === AUTHORIZED &&
        accountStoreState?.status === FULFILLED
      );
    });
  };
}
