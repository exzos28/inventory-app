import {batchDisposers, Service} from '../structure';
import {Core} from './Core';
import {AppLifecycleService} from '../AppLifecycle';
import {computed} from 'mobx';
import {ErrorRepositoryImpl} from '../ErrorRepository';
import {JsonImpl} from '../Json';
import {HttpImpl} from '../Http';
import {KeyValueMap, KeyValueStore, KeyValueStoreImpl} from '../KeyValueStore';
import {JsonKeyValueMap, JsonKeyValueStoreImpl} from '../JsonKeyValueStore';
import {AppearanceService} from '../Appearance';

export default class CoreService implements Core, Service {
  readonly json = new JsonImpl(this);
  readonly http = new HttpImpl(this);

  readonly appLifecycle = new AppLifecycleService();

  readonly errorRepository = new ErrorRepositoryImpl();

  readonly keyValueStore = new KeyValueStoreImpl<KeyValueMap>(this);
  readonly jsonKeyValueStore = new JsonKeyValueStoreImpl(
    this,
    this.keyValueStore as KeyValueStore<JsonKeyValueMap>,
  );
  readonly appearance = new AppearanceService();

  @computed get initialized() {
    return this.appLifecycle.initialized;
  }

  subscribe() {
    return batchDisposers(
      this.appLifecycle.subscribe(),
      this.appearance.subscribe(),
    );
  }
}
