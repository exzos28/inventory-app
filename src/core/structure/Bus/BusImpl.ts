import {Bus, Listener} from './Bus';
import {Disposer} from '../Service';

export default class BusImpl<T> implements Bus<T> {
  private readonly _listeners = new Set<Listener<T>>();

  send(event: T) {
    for (const listener of this._listeners) {
      listener(event);
    }
  }

  listen(listener: Listener<T>) {
    this._listeners.add(listener);
    return (() => {
      this.forget(listener);
    }) as Disposer;
  }

  forget(listener: Listener<T>) {
    this._listeners.delete(listener);
  }
}
