import {Disposer} from './Disposer';

export default (...args: DisposerList): Disposer =>
  (() => {
    for (let i = args.length - 1; i >= 0; i--) {
      const arg = args[i];
      if (arg !== undefined) {
        arg();
      }
    }
  }) as Disposer;

export type DisposerList = (Disposer | void)[];
