import {
  CreateProjectParams,
  GetProjectParams,
  ProjectHelper,
} from './ProjectHelper';
import {error, success} from '../fp';
import {ProjectRestClient} from '../ProjectRestClient';
import {GENERAL_REST_CLIENT_ERROR, UNKNOWN_ERROR, UnknownError} from '../Error';
import {ErrorRepository} from '../ErrorRepository';

export default class ProjectHelperImpl implements ProjectHelper {
  constructor(
    private readonly _root: {
      readonly projectRestClient: ProjectRestClient;
      readonly errorRepository: ErrorRepository;
    },
  ) {}

  create(params: CreateProjectParams) {
    // TODO Delete company_name
    return this._root.projectRestClient.create({...params, company_name: ''});
  }

  async get({id, currentUserId}: GetProjectParams) {
    const project_ = await this._root.projectRestClient.get({id});
    if (!project_.success) {
      return project_;
    }
    // fuck!
    const currentUser = project_.right.users.find(_ => _.id === currentUserId);
    if (!currentUser) {
      return error(
        this._root.errorRepository.create<UnknownError>({kind: UNKNOWN_ERROR}),
      );
    }
    return success({
      project: project_.right,
      role: currentUser.role,
    });
  }

  getAll() {
    return this._root.projectRestClient.getAll().then(response => {
      if (!response.success) {
        const isNotFound =
          response.left.kind === GENERAL_REST_CLIENT_ERROR &&
          response.left.statusCode === 404;
        if (isNotFound) {
          return success([]);
        }
        return response;
      }
      return success(response.right.projects);
    });
  }
}
