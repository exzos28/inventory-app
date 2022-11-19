export interface CachedConsumable<T> {
  getCachedConsumable(): Promise<T>;
}
