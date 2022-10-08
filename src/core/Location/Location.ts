import {Either} from '../fp';
import {Url} from '../units';
import {GlobalError} from '../Error';

export interface Location {
  open(locator: Url): Promise<Either<void, GlobalError>>;
  canOpen(locator: Url): Promise<Either<boolean, GlobalError>>;
}
