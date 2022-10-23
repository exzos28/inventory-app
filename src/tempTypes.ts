import {Url} from './core';

export type Item = {
  image: Url;
  name: string;
  serialNumber: string;
  fields: {
    label: string;
    value: string;
  }[];
};
