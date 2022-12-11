import {BaseShadesRestClientImpl} from '../BaseShadesRestClient';
import {Configuration} from '../Configuration';
import {GlobalError} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {Either} from '../fp';
import {Fetch} from '../Http';
import {Json} from '../Json';
import {Url} from '../units';
import {
  CreateItemParams,
  DeleteProjectParams,
  GetAllParams,
  GetItemParams,
  ServerItem,
  ItemRestClient,
  UpdateItemParams,
  GetAllResponse,
} from './ItemRestClient';
import {Maybe} from '../Maybe';

export default class ItemRestClientImpl
  extends BaseShadesRestClientImpl
  implements ItemRestClient
{
  constructor(
    protected readonly _root: {
      readonly errorRepository: ErrorRepository;
      readonly configuration: Configuration;
      readonly json: Json;
    },
    readonly fetch: Fetch,
  ) {
    super(_root, fetch);
  }

  protected get _base() {
    return this._root.configuration.current.values.shadesRestApiUrl;
  }

  protected get _timeout() {
    return this._root.configuration.current.values.shadesRestApiTimeout;
  }

  async getAll({
    project_id,
  }: GetAllParams): Promise<Either<GetAllResponse, GlobalError>> {
    return this._fetch('GET', `inventory-item/${project_id}` as Url);
  }

  async create({project_id, item}: CreateItemParams): Promise<Maybe<void>> {
    return this._fetch(
      'POST',
      `inventory-item/${project_id}` as Url,
      item,
      'form-data',
    );
  }

  async get({
    id,
    project_id,
  }: GetItemParams): Promise<Either<ServerItem, GlobalError>> {
    return this._fetch('GET', `inventory-item/${project_id}/${id}` as Url);
  }

  async update({project_id, item, id}: UpdateItemParams): Promise<Maybe<void>> {
    return this._fetch(
      'PATCH',
      `inventory-item/${project_id}/${id}` as Url,
      item,
      'form-data',
    );
  }

  async delete({id, project_id}: DeleteProjectParams): Promise<Maybe<void>> {
    return this._fetch('DELETE', `inventory-item/${project_id}/${id}` as Url);
  }
}
