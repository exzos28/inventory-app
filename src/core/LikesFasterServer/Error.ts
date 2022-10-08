import {JsonSerializable} from '../Json';

export type ValidationError = {
  loc: string[];
  msg: string;
  type: string;
};

export type DetailedError<D extends JsonSerializable> = {
  detail: D[];
};
