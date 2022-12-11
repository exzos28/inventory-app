import {
  DeleteUserParams,
  GetUsersResult,
  InviteUserParams,
  ProjectUsersHelper,
} from './ProjectUsersHelper';
import {Either, error, success} from '../fp';
import {ProjectId, UserId} from '../HadesServer';
import {
  GlobalError,
  PROJECT_NOT_SELECTED,
  UNKNOWN_ERROR,
  UnknownError,
} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {ProjectStore} from '../ProjectStore';
import {ProjectUsersRestClient} from '../ProjectUsersRestClient';
import {Maybe} from '../Maybe';

export default class ProjectUsersHelperImpl implements ProjectUsersHelper {
  constructor(
    private readonly _root: {
      readonly projectUsersRestClient: ProjectUsersRestClient;
      readonly errorRepository: ErrorRepository;
      readonly projectStore: ProjectStore;
    },
  ) {}

  private _getProjectId(): Either<ProjectId, GlobalError> {
    const {selectedProject} = this._root.projectStore;
    if (selectedProject === undefined) {
      return error(
        this._root.errorRepository.create({
          kind: PROJECT_NOT_SELECTED,
        }),
      );
    }
    return success(selectedProject.project.id);
  }

  async deleteUser(params: DeleteUserParams): Promise<Maybe<void>> {
    const projectId_ = this._getProjectId();
    if (!projectId_.success) {
      return error(projectId_.left);
    }
    return this._root.projectUsersRestClient.deleteUser({
      project_id: projectId_.right,
      id: params.id,
    });
  }

  async inviteUser(params: InviteUserParams): Promise<Maybe<void>> {
    const projectId_ = this._getProjectId();
    if (!projectId_.success) {
      return error(projectId_.left);
    }
    return this._root.projectUsersRestClient.inviteUser({
      project_id: projectId_.right,
      email: params.email,
      role: params.role,
    });
  }

  // TODO replace with backend method
  async getUserById(id: UserId) {
    const userResponse_ = await this.getUsers();
    if (!userResponse_.success) {
      return userResponse_;
    }
    const user = userResponse_.right.find(_ => _.id === id);
    if (!user) {
      return error(
        this._root.errorRepository.create<UnknownError>({kind: UNKNOWN_ERROR}),
      );
    }
    return success(user);
  }

  async getUsers(): Promise<Either<GetUsersResult, GlobalError>> {
    const projectId_ = this._getProjectId();
    if (!projectId_.success) {
      return error(projectId_.left);
    }
    const response = await this._root.projectUsersRestClient.getUsers({
      project_id: projectId_.right,
    });
    if (!response.success) {
      return response;
    }
    return success(response.right.users);
  }
}
