import {BaseShadesRestClientImpl} from '../BaseShadesRestClient';
import {Configuration} from '../Configuration';
import {GlobalError} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {Either} from '../fp';
import {Fetch} from '../Http';
import {Json} from '../Json';
import {Url} from '../units';
import {
  DeleteUserParams,
  GetUsersParams,
  GetUsersResponse,
  InviteUserParams,
  ProjectUsersRestClient,
} from './ProjectUsersRestClient';
import {Maybe} from '../Maybe';

export default class ProjectUsersRestClientImpl
  extends BaseShadesRestClientImpl
  implements ProjectUsersRestClient
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

  getUsers({
    project_id,
  }: GetUsersParams): Promise<Either<GetUsersResponse, GlobalError>> {
    return this._fetch('GET', `projects/${project_id}` as Url);
  }

  deleteUser({project_id, email}: DeleteUserParams): Promise<Maybe<void>> {
    return this._fetch(
      'DELETE',
      `project_users/${project_id}?email=${email}` as Url,
    );
  }

  inviteUser({
    project_id,
    email,
    role,
  }: InviteUserParams): Promise<Maybe<void>> {
    return this._fetch('POST', `project_users/${project_id}` as Url, {
      email,
      role,
    });
  }
}
