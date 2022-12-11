import {ItemId, UserId} from '../HadesServer';
import {Uri} from '../units';
import {Maybe} from '../Maybe';

export interface ItemHelper {
  getAll(): Promise<Maybe<Item[]>>;
  create(params: CreateItemParams): Promise<Maybe<void>>;
  get(params: GetItemParams): Promise<Maybe<Item>>;
  getByQr(qr: string): Promise<Maybe<Item>>;
  update(params: UpdateItemParams): Promise<Maybe<void>>;
  delete(params: DeleteItemParams): Promise<Maybe<void>>;
}

export type CreateItemParams = {
  item: Pick<Item, 'name' | 'serialNumber'> &
    Partial<{
      image: Uri;
      customFields: {
        label: string;
        value: string;
      }[];
    }>;
};

export type GetItemParams = {
  id: ItemId;
};

export type UpdateItemParams = {
  id: ItemId;
  item: Partial<
    Pick<Item, 'name' | 'serialNumber' | 'employee' | 'qrKey'> & {
      image: Uri | null;
      customFields: {
        label: string;
        value: string;
      }[];
    }
  >;
};

export type DeleteItemParams = {
  id: ItemId;
};

export type Item = {
  id: ItemId;
  image: Uri | undefined;
  name: string;
  brand: string | undefined;
  model: string | undefined;
  serialNumber: string | undefined;
  qrKey: string | undefined;
  employee: UserId | undefined;
  project: ItemId | undefined;
  customFields:
    | {
        label: string;
        value: string;
      }[]
    | undefined;
};
