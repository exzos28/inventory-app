import {Router} from './Router';
import {Listener} from '../Bus';
import {Disposer} from '../Service';
import {ValueOf} from 'type-fest';

export default class RouterImpl<T extends {}> implements Router<T> {
  private readonly _listeners = new Map<keyof T, Set<Listener<ValueOf<T>>>>();

  send<P extends keyof T>(theme: P, event: T[P]) {
    const listeners = this._listeners.get(theme);
    if (listeners) {
      for (const listener of listeners) {
        listener(event);
      }
    }
  }

  listen<P extends keyof T>(theme: P, listener: Listener<T[P]>) {
    let listeners = this._listeners.get(theme);
    if (!listeners) {
      listeners = new Set();
      this._listeners.set(theme, listeners);
    }
    listeners.add(listener as Listener<ValueOf<T>>);
    return (() => {
      this.forget(theme, listener);
    }) as Disposer;
  }

  once<P extends keyof T>(theme: P, listener: Listener<T[P]>) {
    const _listener: Listener<T[P]> = params => {
      listener(params);
      this.forget(theme, _listener);
    };
    return this.listen(theme, _listener);
  }

  forget<P extends keyof T>(theme: P, listener: Listener<T[P]>) {
    const listeners = this._listeners.get(theme);
    if (listeners) {
      listeners.delete(listener as Listener<ValueOf<T>>);
      if (listeners.size === 0) {
        this._listeners.delete(theme);
      }
    }
  }
}
