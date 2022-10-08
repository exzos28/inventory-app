export default class Op {
  static add<T extends NumberLike>(a: T, b: T) {
    return (a + b) as T;
  }

  static multiply<T extends NumberLike>(a: T, b: number) {
    return (a * b) as T;
  }

  static subtract<T extends NumberLike>(a: T, b: T) {
    return (a - b) as T;
  }
}

export type NumberLike = number;
