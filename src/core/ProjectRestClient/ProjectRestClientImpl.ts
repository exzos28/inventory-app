import {BaseShadesRestClientImpl} from '../BaseShadesRestClient';
import {Configuration} from '../Configuration';
import {GlobalError} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {Either} from '../fp';
import {Fetch} from '../Http';
import {Json} from '../Json';
import {Url} from '../units';
import {
  CreateProjectParams,
  DeleteProjectParams,
  GetAllResponse,
  GetProjectParams,
  AggregatedProjectResponse,
  ProjectRestClient,
  UpdateProjectParams,
} from './ProjectRestClient';
import {Maybe} from '../Maybe';

export default class ProjectRestClientImpl
  extends BaseShadesRestClientImpl
  implements ProjectRestClient
{
  constructor(
    protected readonly _root: {
      readonly errorRepository: ErrorRepository;
      readonly configuration: Configuration;
      readonly json: Json;
    },
    readonly fetch: Fetch,
  ) {
    super(_root, fetch);
  }

  protected get _base() {
    return this._root.configuration.current.values.shadesRestApiUrl;
  }

  protected get _timeout() {
    return this._root.configuration.current.values.shadesRestApiTimeout;
  }

  async getAll(): Promise<Either<GetAllResponse, GlobalError>> {
    return this._fetch('GET', 'projects' as Url);
  }

  async create(
    params: CreateProjectParams,
  ): Promise<Either<void, GlobalError>> {
    return this._fetch('POST', 'projects' as Url, params);
  }

  async get({
    id,
  }: GetProjectParams): Promise<
    Either<AggregatedProjectResponse, GlobalError>
  > {
    return this._fetch('GET', `projects/${id}` as Url);
  }

  async update(
    params: UpdateProjectParams,
  ): Promise<Either<void, GlobalError>> {
    return this._fetch('PATCH', 'projects' as Url, params);
  }

  async delete({id}: DeleteProjectParams): Promise<Maybe<void>> {
    return this._fetch('DELETE', `projects/${id}` as Url);
  }
}
