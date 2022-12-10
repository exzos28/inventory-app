import {Either} from '../fp';
import {GlobalError} from '../Error';
import {GetProjectParams, ProjectResponse} from '../ProjectRestClient';

export interface ProjectRestClientHelper {
  getAll(): Promise<Either<ProjectResponse[], GlobalError>>;
  create(
    params: CreateProjectParams,
  ): Promise<Either<ProjectResponse, GlobalError>>;
  get(params: GetProjectParams): Promise<Either<ProjectResponse, GlobalError>>;
}

export type CreateProjectParams = {
  name: string;
};
