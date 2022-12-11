import {RestClient} from '../BaseRestClient';
import {GlobalError} from '../Error';
import {Either} from '../fp';
import {ProjectId, UserId, UserRole} from '../HadesServer';
import {Maybe} from '../Maybe';

export interface ProjectUsersRestClient extends RestClient {
  getUsers(
    params: GetUsersParams,
  ): Promise<Either<GetUsersResponse, GlobalError>>;
  inviteUser(params: InviteUserParams): Promise<Maybe<void>>;
  deleteUser(params: DeleteUserParams): Promise<Maybe<void>>;
}

export type GetUsersParams = {
  project_id: ProjectId;
};

export type GetUsersResponse = {
  users: ServerProjectUser[];
};

export type ServerProjectUser = {
  id: UserId;
  username: string;
  email: string;
  role: UserRole;
};

export type InviteUserParams = {
  project_id: ProjectId;
  email: string;
  role: UserRole;
};

export type DeleteUserParams = {
  email: string;
  project_id: ProjectId;
};
