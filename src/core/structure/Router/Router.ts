import {Listener} from '../Bus';
import {Disposer} from '../Service';

export interface Router<T extends {}> extends RouterSource<T>, RouterSink<T> {}

export interface RouterSource<T extends {}> {
  listen<P extends keyof T>(theme: P, listener: Listener<T[P]>): Disposer;
  once<P extends keyof T>(theme: P, listener: Listener<T[P]>): Disposer;
  forget<P extends keyof T>(theme: P, listener: Listener<T[P]>): void;
}

export interface RouterSink<T extends {}> {
  send<P extends keyof T>(theme: P, event: T[P]): void;
}
