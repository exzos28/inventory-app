import {RestClient} from '../BaseRestClient';
import {GlobalError} from '../Error';
import {Either} from '../fp';
import {UserId} from '../HadesServer';

// TODO Create transformer helper
export interface UserRestClient extends RestClient {
  me(): Promise<Either<UserResponse, GlobalError>>;
}

export type UserResponse = {
  id: UserId;
  email: string;
  username: string;
};
