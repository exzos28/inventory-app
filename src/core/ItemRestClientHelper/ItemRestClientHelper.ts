import {Either} from '../fp';
import {GlobalError} from '../Error';
import {ItemId} from '../HadesServer';
import {UserId} from '../../tempTypes';
import {Uri} from '../units';

export interface ItemRestClientHelper {
  getAll(): Promise<Either<Item[], GlobalError>>;
  create(params: CreateItemParams): Promise<Either<void, GlobalError>>;
  get(params: GetItemParams): Promise<Either<Item, GlobalError>>;
  update(params: UpdateItemParams): Promise<Either<void, GlobalError>>;
  delete(params: DeleteItemParams): Promise<Either<void, GlobalError>>;
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
  item: Pick<Item, 'name' | 'serialNumber'> &
    Partial<{
      image: Uri | null;
      customFields: {
        label: string;
        value: string;
      }[];
    }>;
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
