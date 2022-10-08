import {RouterSource} from '../structure';
import {Opaque} from 'type-fest';
import {Either} from '../fp';
import {GlobalError} from '../Error';

export const REQUEST = Symbol();
export const RESPONSE = Symbol();
export const RESPONSE_BODY = Symbol();

export interface Http {
  fetch(
    input: RequestInfo,
    init?: RequestInit,
  ): Promise<Either<Response, GlobalError>>;
  io: RouterSource<{
    [REQUEST]: RequestParams;
    [RESPONSE]: ResponseParams;
    [RESPONSE_BODY]: ResponseBodyParams;
  }>;
}

export interface RequestParams {
  correlationId: CorrelationId;
  input: RequestInfo;
  init?: RequestInit;
}

export interface ResponseParams {
  correlationId: CorrelationId;
  response: Response;
}

export interface ResponseBodyParams {
  correlationId: CorrelationId;
  responseBody: string;
}

export const CORRELATION_ID = Symbol();
export type CorrelationId = Opaque<number, typeof CORRELATION_ID>;
