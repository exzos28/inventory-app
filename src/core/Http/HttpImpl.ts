import {
  CorrelationId,
  Http,
  REQUEST,
  RequestParams,
  RESPONSE,
  RESPONSE_BODY,
  ResponseBodyParams,
  ResponseParams,
} from './Http';
import {RouterImpl} from '../structure';
import {success, error, Either} from '../fp';
import {ErrorRepository} from '../ErrorRepository';
import {NETWORK_ERROR, NetworkError} from '../Error';

export default class HttpImpl implements Http {
  constructor(
    protected readonly _root: {readonly errorRepository: ErrorRepository},
  ) {}

  private _correlationId = 0 as CorrelationId;

  private _generateCorrelationId() {
    return this._correlationId++ as CorrelationId;
  }

  async fetch(
    input: RequestInfo,
    init?: RequestInit,
  ): Promise<Either<Response, NetworkError>> {
    const correlationId = this._generateCorrelationId();
    this.io.send(REQUEST, {correlationId, input, init});
    let response: Response;
    try {
      response = await fetch(input, init);
    } catch (raw) {
      return error(
        this._root.errorRepository.create({kind: NETWORK_ERROR, raw}),
      );
    }
    this.io.send(RESPONSE, {correlationId, response});
    const boundResponse = response.clone();
    // fixme mock other methods of the response body
    boundResponse.json = async () => {
      const content = await response.json();
      const responseBody = JSON.stringify(content, undefined, 2);
      this.io.send(RESPONSE_BODY, {correlationId, responseBody});
      return content;
    };
    boundResponse.text = async () => {
      const content = await response.text();
      this.io.send(RESPONSE_BODY, {correlationId, responseBody: content});
      return content;
    };
    return success(boundResponse);
  }

  public io = new RouterImpl<{
    [REQUEST]: RequestParams;
    [RESPONSE]: ResponseParams;
    [RESPONSE_BODY]: ResponseBodyParams;
  }>();
}
