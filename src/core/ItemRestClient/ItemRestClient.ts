import {RestClient} from '../BaseRestClient';
import {GlobalError} from '../Error';
import {Either} from '../fp';
import {ItemId, ProjectId, UserId} from '../HadesServer';
import {Uri} from '../units';
import {JsonString} from '../Json';
import {Maybe} from '../Maybe';

export interface ItemRestClient extends RestClient {
  getAll(params: GetAllParams): Promise<Either<GetAllResponse, GlobalError>>;
  create(params: CreateItemParams): Promise<Maybe<void>>;
  get(params: GetItemParams): Promise<Either<ServerItem, GlobalError>>;
  update(params: UpdateItemParams): Promise<Maybe<void>>;
  delete(params: DeleteProjectParams): Promise<Maybe<void>>;
}

export type GetAllParams = {
  project_id: ProjectId;
};

export type GetAllResponse = {
  items: ServerItem[];
};

export type CreateItemParams = {
  project_id: ProjectId;
  item: Pick<ServerItem, 'name' | 'serial_number'> &
    Partial<{
      image: {uri: Uri; name: string; type: string};
      custom_field: JsonString;
    }>;
};

export type UpdateItemParams = {
  project_id: ProjectId;
  id: ItemId;
  item: Partial<
    Pick<ServerItem, 'name' | 'serial_number' | 'employee' | 'qr_key'> & {
      image: {uri: Uri; name: string; type: string} | null;
      custom_field: JsonString;
    }
  >;
};

export type DeleteProjectParams = {
  id: ItemId;
  project_id: ProjectId;
};

export type GetItemParams = {
  id: ItemId;
  project_id: ProjectId;
};

export type ServerItem = {
  id: ItemId;
  name: string;
} & Partial<{
  image: Uri | null;
  brand: string | null;
  model: string | null;
  serial_number: string | null;
  qr_key: string | null;
  custom_field:
    | {
        label: string;
        value: string;
      }[]
    | null;
  inventory_type: null; // ?type_id
  localization: null; // ?loc_id
  status: null; // ?status_id
  employee: UserId | null; //?user_id;
  project: ItemId | null; // - ?project_id;
}>;
