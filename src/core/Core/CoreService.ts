import {batchDisposers, Service} from '../structure';
import {Core} from './Core';
import {AppLifecycleService} from '../AppLifecycle';
import {computed} from 'mobx';
import {ErrorRepositoryImpl} from '../ErrorRepository';
import {JsonImpl} from '../Json';
import {AppearanceService} from '../Appearance';
import {ConfigurationService} from '../Configuration';

export default class CoreService implements Core, Service {
  readonly json = new JsonImpl(this);

  readonly appLifecycle = new AppLifecycleService();
  readonly configuration = new ConfigurationService(this);

  readonly errorRepository = new ErrorRepositoryImpl();

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
