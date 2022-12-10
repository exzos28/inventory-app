import {Project, ProjectStore} from './ProjectStore';
import {batchDisposers, Service} from '../structure';
import {AuthClient, AUTHORIZED} from '../Auth';
import {GlobalError} from '../Error';
import PromiseStateProviderImpl from '../AsyncAtom/PromiseStateProviderImpl';
import {PromiseStateProvider} from '../AsyncAtom/PromiseStateProvider';
import {ProjectRestClientHelper} from '../ProjectRestClientHelper';
import {action, computed, makeObservable, observable, reaction} from 'mobx';
import {FULFILLED} from '../AsyncAtom';
import {first} from 'lodash';
import {bind, success} from '../fp';
import {ProjectId} from '../HadesServer';
import {JsonKeyValueMap, JsonKeyValueStore} from '../JsonKeyValueStore';

export default class ProjectStoreService implements ProjectStore, Service {
  @observable private _selectedProjectId?: ProjectId;

  private readonly _promiseState: PromiseStateProvider<Project[], GlobalError>;

  constructor(
    private readonly _root: {
      readonly authClient: AuthClient;
      readonly projectRestClientHelper: ProjectRestClientHelper;
      readonly jsonKeyValueStore: JsonKeyValueStore<JsonKeyValueMap>;
    },
  ) {
    makeObservable(this);
    this._promiseState = new PromiseStateProviderImpl(this._fetchData);
  }

  private _fetchData = bind(() => {
    return this._root.projectRestClientHelper.getAll();
  }, this);

  fetch = bind(async () => {
    const response_ = await this._promiseState.fetch();
    if (response_.success) {
      return success();
    }
    return response_;
  }, this);

  selectProject = action(async (id: ProjectId) => {
    const exists = this.projects?.find(_ => _.id === id);
    if (!exists) {
      return;
    }
    this._selectedProjectId = id;
    await this._root.jsonKeyValueStore.set('selectedProjectId', id);
  });

  private _setProjectId = action((id: ProjectId) => {
    this._selectedProjectId = id;
  });

  private _selectProjectOnFulfilled() {
    return reaction(
      () => this._promiseState.state,
      async state => {
        if (state?.status === FULFILLED) {
          const prevSelected = await this._root.jsonKeyValueStore.get(
            'selectedProjectId',
          );
          if (prevSelected.success) {
            const exists = state.result.find(_ => _.id === prevSelected.right);
            if (exists && prevSelected.right) {
              this._setProjectId(prevSelected.right);
              return;
            }
          }
          const firstItem = first(state.result);
          if (firstItem) {
            this._setProjectId(firstItem.id);
          }
        }
      },
    );
  }

  get state() {
    return this._promiseState.state;
  }

  @computed
  get selectedProject() {
    return this.projects?.find(_ => _.id === this._selectedProjectId);
  }

  @computed
  get projects() {
    return this._promiseState.state?.status === FULFILLED
      ? this._promiseState.state.result
      : undefined;
  }

  private _fetchOnAuthorized() {
    return this._root.authClient.responses.listen(AUTHORIZED, _ =>
      this._promiseState.fetch(),
    );
  }

  subscribe() {
    return batchDisposers(
      this._fetchOnAuthorized(),
      this._selectProjectOnFulfilled(),
    );
  }
}
