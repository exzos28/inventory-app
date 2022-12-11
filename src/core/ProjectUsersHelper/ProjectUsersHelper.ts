import {Either} from '../fp';
import {GlobalError} from '../Error';
import {UserId, UserRole} from '../HadesServer';
import {Maybe} from '../Maybe';

export interface ProjectUsersHelper {
  getUsers(): Promise<Either<GetUsersResult, GlobalError>>;
  getUserById(id: UserId): Promise<Either<User, GlobalError>>;
  inviteUser(params: InviteUserParams): Promise<Maybe<void>>;
  deleteUser(params: DeleteUserParams): Promise<Maybe<void>>;
}

export type GetUsersResult = User[];

export type User = {
  id: UserId;
  username: string;
  email: string;
  role: UserRole;
};

export type InviteUserParams = {
  email: string;
  role: UserRole;
};

export type DeleteUserParams = {
  email: string;
};
