import {Uri} from '../../../core';

export type ItemFormValues = {
  image: Uri | undefined;
  name: string;
  serialNumber: string | undefined;
  customFields:
    | {
        label: string;
        value: string;
      }[]
    | undefined;
};
