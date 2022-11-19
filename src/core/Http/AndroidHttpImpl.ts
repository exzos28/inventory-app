import {NetworkError} from '../Error';
import {Either} from '../fp';
import {Http} from './Http';
import HttpImpl from './HttpImpl';

export default class AndroidHttpImpl extends HttpImpl implements Http {
  private static readonly _TEMPORARY_REDIRECT = 307;
  private static readonly _PERMANENT_REDIRECT = 308;

  async fetch(
    input: RequestInfo,
    init?: RequestInit,
  ): Promise<Either<Response, NetworkError>> {
    const response_ = await super.fetch(input, init);
    if (!response_.success) {
      return response_;
    }
    const response = response_.right;
    const redirectReceived =
      response.status === AndroidHttpImpl._TEMPORARY_REDIRECT ||
      response.status === AndroidHttpImpl._PERMANENT_REDIRECT;
    const method = init?.method ?? 'GET';
    if (redirectReceived && method === 'POST') {
      const location = response.headers.get('Location');
      if (!location) {
        return response_;
      }
      return super.fetch(location, init);
    }
    return response_;
  }
}
