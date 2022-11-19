import {BusImpl} from '../structure';
import {CachedConsumable} from './CachedConsumable';

export default class CachedConsumableImpl<T> implements CachedConsumable<T> {
  private readonly _valueBus = new BusImpl<(_: T) => any>();
  private readonly _errorBus = new BusImpl<(_: unknown) => any>();
  private _pending = false;
  private _value: Nullable<T> = {empty: true};

  constructor(private readonly _consume: () => Promise<T>) {}

  async getCachedConsumable(): Promise<T> {
    if (this._pending) {
      return new Promise((resolve, reject) => {
        this._valueBus.once(resolve);
        this._errorBus.once(reject);
      });
    }
    if (!this._value.empty) {
      return this._value.value;
    }
    this._pending = true;
    try {
      const value = await this._consume();
      this._value = {empty: false, value};
      this._valueBus.send(value);
      return value;
    } catch (raw) {
      this._errorBus.send(raw);
      throw raw;
    } finally {
      this._pending = false;
    }
  }
}

type Nullable<T> = Value<T> | Null;

type Value<T> = {empty: false; value: T};

type Null = {empty: true};
