import {Either} from '../fp';
import {GlobalError} from '../Error';
import {ProjectResponse} from '../ProjectRestClient';
import {ProjectId, UserId, UserRole} from '../HadesServer';

export interface ProjectHelper {
  getAll(): Promise<Either<GetAllResult, GlobalError>>;
  create(params: CreateProjectParams): Promise<Either<void, GlobalError>>;
  get(
    params: GetProjectParams,
  ): Promise<Either<AggregatedProject, GlobalError>>;
}

export type CreateProjectParams = {
  name: string;
};

export type GetProjectParams = {
  id: ProjectId;
  currentUserId: UserId;
};

export type GetAllResult = {
  id: ProjectId;
  name: string;
}[];

export type AggregatedProject = {
  project: ProjectResponse;
  role: UserRole;
};
