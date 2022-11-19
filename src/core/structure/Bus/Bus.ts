import {Disposer} from '../Service';

export interface Bus<L extends BaseListener> extends BusSource<L>, BusSink<L> {}

export interface BusSource<L extends BaseListener> {
  readonly listeners: ReadonlySet<L>;
  readonly isBeingListened: boolean;
  readonly afterBeingListened: BusSource<(listener: L) => void>;
  readonly beforeBeingForgot: BusSource<(listener: L) => void>;
  listen(listener: L): Disposer;
  once(listener: L): Disposer;
  forget(listener: L): void;
}

export interface BusSink<L extends BaseListener> {
  send(...args: Parameters<L>): void;
}

export type BaseListener = (...args: any[]) => any;
