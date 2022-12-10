import {BaseRestClientImpl, RestMethod} from '../BaseRestClient';
import {
  GlobalError,
  SPECIALIZED_SHADES_RESPONSE_ERROR,
  SpecializedShadesResponseError,
} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {Either, error} from '../fp';
import {Fetch} from '../Http';
import {Json, JsonSerializable} from '../Json';
import {ErrorResponse} from '../HadesServer';
import {Url} from '../units';

export default abstract class BaseRoboxRestClientImpl extends BaseRestClientImpl {
  protected constructor(
    protected readonly _root: {
      readonly errorRepository: ErrorRepository;
      readonly json: Json;
    },
    readonly fetch: Fetch,
  ) {
    super(_root, fetch);
  }

  protected async _fetch<
    P extends JsonSerializable = JsonSerializable,
    R extends JsonSerializable | void = JsonSerializable | void,
  >(
    method: RestMethod,
    endpoint: Url,
    params?: P,
  ): Promise<Either<R, GlobalError>> {
    const response = await super._call<P, R>(method, endpoint, params);
    if (response.success) {
      const errorResponse = this._isErrorResponse(response.right);
      if (errorResponse) {
        return error(
          this._root.errorRepository.create<SpecializedShadesResponseError>({
            kind: SPECIALIZED_SHADES_RESPONSE_ERROR,
            description: errorResponse.message,
            raw: errorResponse,
            error: errorResponse.error,
            message: errorResponse.message,
          }),
        );
      }
    }
    if (!response.success) {
      return error(this.generalizeError(response.left));
    }
    return response;
  }

  private _isErrorResponse(
    response: JsonSerializable | void,
  ): ErrorResponse | null {
    if (typeof response === 'object') {
      const response_ = response as Partial<ErrorResponse>;
      if (response_.error !== undefined && response_.message !== undefined) {
        return {
          error: response_.error,
          message: response_.message,
        };
      }
    }
    return null;
  }
}
