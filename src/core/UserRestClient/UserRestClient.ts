import {RestClient} from '../BaseRestClient';
import {GlobalError} from '../Error';
import {Either} from '../fp';

export interface UserRestClient extends RestClient {
  me(): Promise<Either<UserResponse, GlobalError>>;
}

export type UserResponse = {
  email: string;
  nickname: string;
};
