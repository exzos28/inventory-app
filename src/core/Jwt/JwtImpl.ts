import {GlobalError, JWT_PARSE_ERROR, JwtParseError} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {Either, error, success} from '../fp';
import {Json, JsonString} from '../Json';
import {Base64Url, Rfc4648} from '../Rfc4648';
import {TextBuffer, TextEndec} from '../TextEndec';
import {Time} from '../Time';
import {Jwt, JwtPayload, JwtString, JwtSummary} from './Jwt';

export default class JwtImpl implements Jwt {
  constructor(
    private readonly _root: {
      readonly json: Json;
      readonly textEndec: TextEndec;
      readonly rfc4648: Rfc4648;
      readonly errorRepository: ErrorRepository;
      readonly time: Time;
    },
  ) {}

  parse(token: JwtString): Either<JwtSummary, GlobalError> {
    const splitting = token.split('.', 2);
    if (splitting.length < 2) {
      return error(
        this._root.errorRepository.create<JwtParseError>({
          kind: JWT_PARSE_ERROR,
          description: "Wrong format: Failed to get the JWT's payload",
        }),
      );
    }
    const [, base64Url] = splitting as [string, JwtPayloadString];
    const textBuffer_ = this._root.rfc4648.fromBase64Url(base64Url);
    if (!textBuffer_.success) {
      return textBuffer_;
    }
    const jsonString_ = this._root.textEndec.decode(textBuffer_.right);
    if (!jsonString_.success) {
      return jsonString_;
    }
    const payload_ = this._root.json.parse(jsonString_.right);
    if (!payload_.success) {
      return payload_;
    }
    return success({payload: payload_.right});
  }
}

type JwtPayloadString = Base64Url<TextBuffer<JsonString<JwtPayload>>>;
