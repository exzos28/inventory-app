import {RestClient} from '../BaseRestClient';
import {GlobalError} from '../Error';
import {Either} from '../fp';

// TODO Create transformer helper
export interface UserRestClient extends RestClient {
  me(): Promise<Either<UserResponse, GlobalError>>;
}

export type UserResponse = {
  email: string;
  nickname: string;
};
