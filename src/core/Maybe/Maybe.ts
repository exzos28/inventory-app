import {GlobalError} from '../Error';
import {Either} from '../fp';

export type Maybe<T> = Either<T, GlobalError>;
