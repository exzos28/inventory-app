export type Base64Url<T extends ArrayBuffer = ArrayBuffer> = string & {
  __base64UrlSerialized__: T;
};
