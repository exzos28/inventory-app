import {ValueOf} from 'type-fest';

import {BaseListener, BusSource} from '../Bus';
import {Disposer} from '../Service';

export interface Router<M extends RouterMap>
  extends RouterSource<M>,
    RouterSink<M> {}

export type RouterMap = {
  [K in string | number | symbol]: BaseListener;
};

export type RouterMapEvents<M extends RouterMap> = {
  [K in keyof M]: {
    theme: K;
    args: Parameters<M[K]>;
  };
}[keyof M];

export interface RouterSource<M extends RouterMap> {
  readonly listeners: ReadonlyMap<keyof M, ReadonlySet<ValueOf<M>>>;
  getListeners<K extends keyof M>(theme: K): ReadonlySet<M[K]>;
  readonly isBeingListened: boolean;
  readonly afterBeingListened: RouterSource<MetaRouterMap<M>>;
  readonly beforeBeingForgot: RouterSource<MetaRouterMap<M>>;
  listen<K extends keyof M>(theme: K, listener: M[K]): Disposer;
  once<K extends keyof M>(theme: K, listener: M[K]): Disposer;
  forget<K extends keyof M>(theme: K, listener: M[K]): void;
  readonly domain: BusSource<(event: RouterMapEvents<M>) => void>;
}

export interface RouterSink<M extends RouterMap> {
  send<K extends keyof M>(theme: K, ...args: Parameters<M[K]>): void;
}

export type MetaRouterMap<M extends RouterMap> = {
  [K in keyof M]: (listener: M[K]) => void;
};
