import {GeneralRestClientError, GlobalError} from '../Error';
import {JsonSerializable} from '../Json';

export interface RestClient {
  generalizeError(e: HttpRestClientError): GeneralRestClientError;
  generalizeError(e: GlobalError | HttpRestClientError): GlobalError;
}

export type RestMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';

export const HTTP_REST_CLIENT_ERROR = Symbol();
export type HttpRestClientError<E extends JsonSerializable = JsonSerializable> =
  {
    kind: typeof HTTP_REST_CLIENT_ERROR;
    description: string;
    raw: unknown;
    body?: E;
    statusCode: number;
  };

export type RestClientCallError<E extends JsonSerializable = JsonSerializable> =
  GlobalError | HttpRestClientError<E>;
