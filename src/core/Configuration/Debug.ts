import {Bound} from '../fp';

export interface Debug {
  readonly debugEnabled: boolean;
  enableDebug: Bound<() => Promise<void>, Debug>;
  disableDebug: Bound<() => Promise<void>, Debug>;
  readonly logEnabled: boolean;
  toggleLog: Bound<() => Promise<void>, Debug>;
}
