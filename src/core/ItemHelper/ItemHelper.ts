import {Either} from '../fp';
import {GlobalError} from '../Error';
import {ItemId, UserId} from '../HadesServer';
import {Uri} from '../units';
import {Maybe} from '../Maybe';

export interface ItemHelper {
  getAll(): Promise<Either<Item[], GlobalError>>;
  create(params: CreateItemParams): Promise<Maybe<void>>;
  get(params: GetItemParams): Promise<Either<Item, GlobalError>>;
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
    Pick<Item, 'name' | 'serialNumber' | 'employee'> & {
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
