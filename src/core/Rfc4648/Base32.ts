export type Base32<T extends ArrayBuffer = ArrayBuffer> = string & {
  __base32Serialized__: T;
};
