import {Disposer} from '../Service';

export interface Bus<T> extends BusSource<T>, BusSink<T> {}

export interface BusSource<T> {
  listen(listener: Listener<T>): Disposer;
  forget(listener: Listener<T>): void;
}

export interface BusSink<T> {
  send(event: T): void;
}

export interface Listener<T> {
  (event: T): void;
}
