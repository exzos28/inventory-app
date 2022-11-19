import {ValueOf} from 'type-fest';

import {BaseListener, BusImpl} from '../Bus';
import {Disposer} from '../Service';
import {
  MetaRouterMap,
  Router,
  RouterMap,
  RouterMapEvents,
  RouterSource,
} from './Router';

export default class RouterImpl<M extends RouterMap> implements Router<M> {
  private readonly _domain = new BusImpl<(event: RouterMapEvents<M>) => void>();
  private readonly _listeners = new Map<keyof M, Set<ValueOf<M>>>();
  private _afterBeingListened?: RouterImpl<MetaRouterMap<M>>;
  private _beforeBeingForgot?: RouterImpl<MetaRouterMap<M>>;

  get listeners(): ReadonlyMap<keyof M, ReadonlySet<ValueOf<M>>> {
    return this._listeners;
  }

  getListeners<K extends keyof M>(theme: K): ReadonlySet<M[K]> {
    return (this._listeners.get(theme) ??
      RouterImpl._EMPTY_SET) as ReadonlySet<BaseListener> as ReadonlySet<M[K]>;
  }

  get isBeingListened(): boolean {
    return this._listeners.size > 0;
  }

  get afterBeingListened(): RouterSource<MetaRouterMap<M>> {
    if (this._afterBeingListened) {
      return this._afterBeingListened;
    }
    this._afterBeingListened = new RouterImpl();
    return this._afterBeingListened;
  }

  get beforeBeingForgot(): RouterSource<MetaRouterMap<M>> {
    if (this._beforeBeingForgot) {
      return this._beforeBeingForgot;
    }
    this._beforeBeingForgot = new RouterImpl();
    return this._beforeBeingForgot;
  }

  send<K extends keyof M>(theme: K, ...args: Parameters<M[K]>) {
    if (this._domain.isBeingListened) {
      this._domain.send({theme, args});
    }
    const listeners = this._listeners.get(theme);
    if (listeners) {
      for (const listener of listeners) {
        listener(...args);
      }
    }
  }

  listen<K extends keyof M>(theme: K, listener: M[K]) {
    let listeners = this._listeners.get(theme);
    if (!listeners) {
      listeners = new Set();
      this._listeners.set(theme, listeners);
    }
    listeners.add(listener);
    this._afterBeingListened?.send(theme, ...([listener] as any));
    return (() => {
      this.forget(theme, listener);
    }) as Disposer;
  }

  once<K extends keyof M>(theme: K, listener: M[K]) {
    const _listener = ((...args: Parameters<M[K]>) => {
      listener(...args);
      this.forget(theme, _listener);
    }) as M[K];
    return this.listen(theme, _listener);
  }

  forget<K extends keyof M>(theme: K, listener: M[K]) {
    this._beforeBeingForgot?.send(theme, ...([listener] as any));
    const listeners = this._listeners.get(theme);
    if (listeners) {
      listeners.delete(listener);
      if (listeners.size === 0) {
        this._listeners.delete(theme);
      }
    }
  }

  get domain(): RouterSource<M>['domain'] {
    return this._domain;
  }

  private static readonly _EMPTY_SET = new Set<never>();
}
