import {RestClient} from '../BaseRestClient';
import {GlobalError} from '../Error';
import {Either} from '../fp';
import {ProjectId, UserId, UserRole} from '../HadesServer';
import {Maybe} from '../Maybe';

export interface ProjectRestClient extends RestClient {
  getAll(): Promise<Either<GetAllResponse, GlobalError>>;
  create(params: CreateProjectParams): Promise<Either<void, GlobalError>>;
  get(
    params: GetProjectParams,
  ): Promise<Either<AggregatedProjectResponse, GlobalError>>;
  update(params: UpdateProjectParams): Promise<Either<void, GlobalError>>;
  delete(params: DeleteProjectParams): Promise<Maybe<void>>;
}

export type CreateProjectParams = {
  name: string;
  /**
   * @deprecated
   */
  company_name: string; // TODO Remove
};

export type UpdateProjectParams = {
  name: string;
};

export type DeleteProjectParams = {
  id: ProjectId;
};

export type GetProjectParams = {
  id: ProjectId;
};

export type GetAllResponse = {
  projects: ProjectResponse[];
};

export type ProjectResponse = {
  id: ProjectId;
  name: string;
};

export type AggregatedProjectResponse = ProjectResponse & {
  users: {
    id: UserId;
    username: string;
    email: string;
    role: UserRole;
  }[];
};
