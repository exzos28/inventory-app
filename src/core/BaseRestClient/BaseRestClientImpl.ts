import {
  GENERAL_REST_CLIENT_ERROR,
  GeneralRestClientError,
  GlobalError,
  TIMEOUT_ERROR,
  TimeoutError,
} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {Either, error, success} from '../fp';
import {Fetch} from '../Http';
import {Json, JsonSerializable} from '../Json';
import {Millisecond} from '../Time';
import {Url} from '../units';
import delayResolve from '../util/delayResolve';
import {
  HTTP_REST_CLIENT_ERROR,
  HttpRestClientError,
  RestClientCallError,
  RestMethod,
} from './RestClient';
import {isObject} from 'lodash';

export default abstract class BaseRestClientImpl {
  protected constructor(
    protected readonly _root: {
      readonly errorRepository: ErrorRepository;
      readonly json: Json;
    },
    readonly fetch: Fetch,
  ) {}

  protected abstract get _base(): Url;

  protected abstract get _timeout(): Millisecond;

  protected async _call<
    P extends JsonSerializable = JsonSerializable,
    R extends JsonSerializable | void = JsonSerializable | void,
    E extends JsonSerializable = JsonSerializable,
  >(
    method: RestMethod,
    endpoint: Url,
    params?: P,
    contentType?: 'json' | 'form-data',
  ): Promise<Either<R, RestClientCallError<E>>> {
    let data;
    const formData = new FormData();
    const isFormData = contentType === 'form-data';
    if (params) {
      if (isFormData) {
        if (isObject(params)) {
          Object.keys(params).forEach(key => {
            // @ts-ignore TODO Fix this Typescript
            const value = params[key];
            if (value !== undefined) {
              formData.append(key, value);
            }
          });
        }
      } else {
        const body_ = await this._root.json.stringify(params);
        if (!body_.success) {
          return body_;
        }
        data = body_.right;
      }
    }
    const headers = isFormData
      ? {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        }
      : {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        };
    const fetchPromise = this.fetch.fetch(`${this._base}${endpoint}`, {
      method,
      body: isFormData ? formData : data,
      headers: headers,
    });
    const response_ =
      this._timeout === undefined || !isFinite(this._timeout)
        ? await fetchPromise
        : await Promise.race([
            fetchPromise,
            delayResolve(this._timeout, () =>
              error(
                this._root.errorRepository.create<TimeoutError>({
                  kind: TIMEOUT_ERROR,
                  description: `REST ${method} ${endpoint} failed with timeout`,
                }),
              ),
            ),
          ]);
    if (!response_.success) {
      return response_;
    }
    const response = response_.right;
    let responseBody;
    try {
      responseBody = await response.json();
    } catch (ignore) {}
    if (response.ok) {
      return success(responseBody as R);
    }
    return error(
      this._root.errorRepository.create<HttpRestClientError<E>>({
        kind: HTTP_REST_CLIENT_ERROR,
        description: `The REST method ${endpoint} failed with the code ${response.status}`,
        statusCode: response.status,
        body: responseBody,
      }),
    );
  }

  generalizeError(
    e: GlobalError | HttpRestClientError,
  ): GeneralRestClientError {
    if (e.kind === HTTP_REST_CLIENT_ERROR) {
      return this._root.errorRepository.create<GeneralRestClientError>({
        ...e,
        kind: GENERAL_REST_CLIENT_ERROR,
      });
    }
    // Lame return type to win Typescript. Perfectly, should remain GlobalError.
    return e as GeneralRestClientError;
  }
}
