import {RestClient} from '../BaseRestClient';
import {GlobalError} from '../Error';
import {Either} from '../fp';
import {ProjectId} from '../HadesServer';

export interface ProjectRestClient extends RestClient {
  getAll(): Promise<Either<ProjectResponse[], GlobalError>>;
  create(
    params: CreateProjectParams,
  ): Promise<Either<ProjectResponse, GlobalError>>;
  get(params: GetProjectParams): Promise<Either<ProjectResponse, GlobalError>>;
  update(
    params: UpdateProjectParams,
  ): Promise<Either<ProjectResponse, GlobalError>>;
  delete(params: DeleteProjectParams): Promise<Either<void, GlobalError>>;
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

export type ProjectResponse = {
  id: ProjectId;
  name: string;
};
