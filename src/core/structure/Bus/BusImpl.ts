import {Disposer} from '../Service';
import {BaseListener, Bus, BusSource} from './Bus';

export default class BusImpl<L extends BaseListener> implements Bus<L> {
  private readonly _listeners = new Set<L>();
  private _afterBeingListened?: BusImpl<(listener: L) => void>;
  private _beforeBeingForgot?: BusImpl<(listener: L) => void>;

  get listeners(): ReadonlySet<L> {
    return this._listeners;
  }

  get isBeingListened(): boolean {
    return this._listeners.size > 0;
  }

  get afterBeingListened(): BusSource<(listener: L) => void> {
    if (this._afterBeingListened) {
      return this._afterBeingListened;
    }
    this._afterBeingListened = new BusImpl();
    return this._afterBeingListened;
  }

  get beforeBeingForgot(): BusSource<(listener: L) => void> {
    if (this._beforeBeingForgot) {
      return this._beforeBeingForgot;
    }
    this._beforeBeingForgot = new BusImpl();
    return this._beforeBeingForgot;
  }

  send(...args: Parameters<L>) {
    for (const listener of this._listeners) {
      listener(...args);
    }
  }

  listen(listener: L) {
    this._listeners.add(listener);
    this._afterBeingListened?.send(listener);
    return (() => {
      this.forget(listener);
    }) as Disposer;
  }

  once(listener: L) {
    const _listener = ((...args: Parameters<L>) => {
      listener(...args);
      this.forget(_listener);
    }) as L;
    return this.listen(_listener);
  }

  forget(listener: L) {
    this._beforeBeingForgot?.send(listener);
    this._listeners.delete(listener);
  }
}
