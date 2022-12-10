import {
  CreateProjectParams,
  ProjectRestClientHelper,
} from './ProjectRestClientHelper';
import {bind, success} from '../fp';
import {GetProjectParams, ProjectRestClient} from '../ProjectRestClient';
import {GENERAL_REST_CLIENT_ERROR} from '../Error';

export default class ProjectRestClientHelperImpl
  implements ProjectRestClientHelper
{
  constructor(
    private readonly _root: {
      readonly projectRestClient: ProjectRestClient;
    },
  ) {}

  create = bind((params: CreateProjectParams) => {
    // TODO Delete company_name
    return this._root.projectRestClient.create({...params, company_name: ''});
  }, this);

  get = bind((params: GetProjectParams) => {
    return this._root.projectRestClient.get(params);
  }, this);

  getAll = bind(() => {
    return this._root.projectRestClient.getAll().then(response => {
      if (!response.success) {
        const isNotFound =
          response.left.kind === GENERAL_REST_CLIENT_ERROR &&
          response.left.statusCode === 404;
        if (isNotFound) {
          return success([]);
        }
      }
      return response;
    });
  }, this);
}
