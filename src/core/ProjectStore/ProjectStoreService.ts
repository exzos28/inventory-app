import {Project, ProjectStore, SelectedProject} from './ProjectStore';
import {batchDisposers, Service} from '../structure';
import {AuthClient, AUTHORIZED, UNAUTHORIZED} from '../Auth';
import {GlobalError, UNKNOWN_ERROR} from '../Error';
import PromiseStateProviderImpl from '../AsyncAtom/PromiseStateProviderImpl';
import {PromiseStateProvider} from '../AsyncAtom/PromiseStateProvider';
import {ProjectHelper} from '../ProjectHelper';
import {
  computed,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from 'mobx';
import {FULFILLED} from '../AsyncAtom';
import {first} from 'lodash';
import {bind, error, success} from '../fp';
import {ProjectId} from '../HadesServer';
import {JsonKeyValueMap, JsonKeyValueStore} from '../JsonKeyValueStore';
import {AccountStore} from '../AccountStore';
import {Maybe} from '../Maybe';
import {ErrorRepository} from '../ErrorRepository';

export default class ProjectStoreService implements ProjectStore, Service {
  @observable private _selectedProject?: SelectedProject;

  private readonly _promiseState: PromiseStateProvider<Project[], GlobalError>;

  constructor(
    private readonly _root: {
      readonly authClient: AuthClient;
      readonly accountStore: AccountStore;
      readonly projectHelper: ProjectHelper;
      readonly jsonKeyValueStore: JsonKeyValueStore<JsonKeyValueMap>;
      readonly errorRepository: ErrorRepository;
    },
  ) {
    makeObservable(this);
    this._promiseState = new PromiseStateProviderImpl(this._fetchData);
  }

  private _fetchData = bind(() => {
    return this._root.projectHelper.getAll();
  }, this);

  fetch = bind(async () => {
    const response_ = await this._promiseState.fetch();
    if (response_.success) {
      return success();
    }
    return response_;
  }, this);

  selectProject = bind(async (id: ProjectId): Promise<Maybe<void>> => {
    const exists = this.projects?.find(_ => _.id === id);
    if (!exists) {
      return error(this._root.errorRepository.create({kind: UNKNOWN_ERROR}));
    }
    const userId =
      this._root.accountStore.state?.status === FULFILLED
        ? this._root.accountStore.state.result.id
        : undefined;
    if (userId === undefined) {
      return error(this._root.errorRepository.create({kind: UNKNOWN_ERROR}));
    }
    const project_ = await this._root.projectHelper.get({
      id,
      currentUserId: userId,
    });
    if (!project_.success) {
      return project_;
    }
    runInAction(
      () =>
        (this._selectedProject = {
          project: project_.right.project,
          role: project_.right.role,
        }),
    );
    const set_ = await this._root.jsonKeyValueStore.set(
      'selectedProjectId',
      id,
    );
    if (!set_.success) {
      return set_;
    }
    return success();
  }, this);

  private _selectProjectOnFulfilled() {
    return reaction(
      () => this._promiseState.state,
      async state => {
        if (state?.status === FULFILLED) {
          const prevSelected = await this._root.jsonKeyValueStore.get(
            'selectedProjectId',
          );
          if (prevSelected.success && prevSelected.right) {
            const exists = state.result.find(_ => _.id === prevSelected.right);
            if (exists && prevSelected.right) {
              await this.selectProject(prevSelected.right);
              return;
            }
          }
          const firstItem = first(state.result);
          if (firstItem) {
            await this.selectProject(firstItem.id);
          }
        }
      },
    );
  }

  get state() {
    return this._promiseState.state;
  }

  get selectedProject() {
    return this._selectedProject;
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

  private _clearOnLogout() {
    return this._root.authClient.responses.listen(UNAUTHORIZED, async _ => {
      runInAction(() => {
        this._selectedProject = undefined;
      });
      await this._root.jsonKeyValueStore.delete('selectedProjectId');
    });
  }

  subscribe() {
    return batchDisposers(
      this._fetchOnAuthorized(),
      this._clearOnLogout(),
      this._selectProjectOnFulfilled(),
    );
  }
}
