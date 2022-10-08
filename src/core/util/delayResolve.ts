import {Millisecond} from '../Time';

export default <T extends any>(timeout: Millisecond, result: () => T) =>
  new Promise<T>(resolve => {
    setTimeout(() => {
      resolve(result());
    }, timeout);
  });
