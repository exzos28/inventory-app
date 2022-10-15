import {computed, flow, makeObservable, observable, runInAction} from 'mobx';
import {AsyncReturnType, ReadonlyDeep} from 'type-fest';

import {AppLifecycle} from '../AppLifecycle';
import {bind} from '../fp';
import {Op} from '../Math';
import {CONFIGURATION, define} from '../persistence';
import {Service} from '../structure';
import {
  Configuration,
  CustomEnvironment,
  DefaultEnvironment,
  EnvironmentId,
} from './Configuration';
import {ConfigurationValues} from './ConfigurationValues';
import {Debug} from './Debug';
import devValues from './devValues';
import prodValues from './prodValues';

const defaultValues = false ? prodValues : devValues;

export default class ConfigurationService
  implements Configuration, Service, Debug
{
  static readonly DEFAULT_ENVIRONMENT: DefaultEnvironment = {
    isDefault: true,
    values: defaultValues,
  };

  @observable private _initialized = false;
  @observable.ref private _record: ConfigurationRecord = {
    debugEnabled: false,
    logEnabled: false,
    environments: [],
    nextEnvironmentId: 0 as EnvironmentId,
  };

  constructor(private readonly _core: {readonly appLifecycle: AppLifecycle}) {
    makeObservable(this);
  }

  get initialized() {
    return this._initialized;
  }

  private get _environmentId() {
    return this._record.environmentId;
  }

  @computed
  get current() {
    const current = this.customEnvironments.find(
      _ => _.id === this._environmentId,
    );
    return current ?? this.defaultEnvironment;
  }

  get values() {
    return this.current.values;
  }

  get defaultEnvironment() {
    return ConfigurationService.DEFAULT_ENVIRONMENT;
  }

  get customEnvironments() {
    return this._record.environments.map(recordToEnvironment);
  }

  get debugEnabled() {
    return this._record.debugEnabled;
  }

  get logEnabled() {
    return (
      this._core.appLifecycle.hasJustBeenInstalled || this._record.logEnabled
    );
  }

  private async _setDebug(enabled: boolean) {
    if (this._record.debugEnabled === enabled) {
      return;
    }
    const record: ConfigurationRecord = {
      ...this._record,
      debugEnabled: enabled,
    };
    await setConfiguration(record);
    runInAction(() => {
      this._record = record;
    });
  }

  readonly enableDebug = bind(() => this._setDebug(true), this);
  readonly disableDebug = bind(() => this._setDebug(false), this);

  readonly toggleLog = bind(async () => {
    const logEnabled = !this._record.logEnabled;
    const record: ConfigurationRecord = {
      ...this._record,
      logEnabled,
    };
    await setConfiguration(record);
    runInAction(() => {
      this._record = record;
    });
  }, this);

  setEnvironment = flow(function* (
    this: ConfigurationService,
    id?: EnvironmentId,
  ) {
    const record: ConfigurationRecord = {
      ...this._record,
      environmentId: id,
    };
    yield setConfiguration(record);
    this._record = record;
  }).bind(this);

  nextEnvironment = bind(
    flow(function* (this: ConfigurationService) {
      const id = this._environmentId;
      const environments = this.customEnvironments;
      if (id === undefined) {
        const [first] = environments;
        if (first) {
          yield this.setEnvironment(first.id);
        }
        return;
      }
      const index = environments.findIndex(_ => _.id === id);
      const nextIndex = index + 1;
      if (nextIndex === environments.length) {
        yield this.setEnvironment();
        return;
      }
      const nextEnvironment = environments[nextIndex];
      yield this.setEnvironment(nextEnvironment.id);
    }),
    this,
  );

  createEnvironment = flow(function* (
    this: ConfigurationService,
    patch: ReadonlyDeep<Partial<ConfigurationValues>>,
  ) {
    const newValues = {...this.defaultEnvironment.values, ...patch};
    const id = this._record.nextEnvironmentId;
    const nextId = Op.add(id, 1 as EnvironmentId);
    const environmentRecord: EnvironmentRecord = {values: newValues, id};
    const environment: CustomEnvironment =
      recordToEnvironment(environmentRecord);
    const records = [
      ...this.customEnvironments.map(environmentToRecord),
      environmentRecord,
    ];
    this._record = {
      ...this._record,
      environments: records,
      nextEnvironmentId: nextId,
    };
    return environment;
  });

  deleteEnvironment = flow(function* (
    this: ConfigurationService,
    id: EnvironmentId,
  ) {
    const environments = this.customEnvironments.filter(_ => _.id !== id);
    const records = environments.map(environmentToRecord);
    const nextId = this._record.nextEnvironmentId;
    const selectedId =
      this._environmentId === id ? undefined : this._environmentId;
    const record: ConfigurationRecord = {
      ...this._record,
      environments: records,
      environmentId: selectedId,
      nextEnvironmentId: nextId,
    };
    yield setConfiguration(record);
    this._record = record;
  });

  private _load = flow(function* (this: ConfigurationService) {
    const configuration: AsyncReturnType<typeof getConfiguration> =
      yield getConfiguration();
    if (configuration.success && configuration.right !== null) {
      this._record = configuration.right;
    }
    this._initialized = true;
  });

  hasMultipleEnvironments(): boolean {
    return this._record.environments.length > 0;
  }

  subscribe() {
    this._load();
  }
}

const [getConfiguration, setConfiguration] =
  define<ConfigurationRecord>(CONFIGURATION);

interface ConfigurationRecord {
  debugEnabled: boolean;
  logEnabled: boolean;
  environments: EnvironmentRecord[];
  environmentId?: EnvironmentId;
  nextEnvironmentId: EnvironmentId;
}

interface EnvironmentRecord {
  id: EnvironmentId;
  values: ConfigurationValues;
}

const environmentToRecord = (_: CustomEnvironment): EnvironmentRecord => ({
  values: _.values,
  id: _.id,
});

const recordToEnvironment = (_: EnvironmentRecord): CustomEnvironment => ({
  values: _.values,
  isDefault: false,
  id: _.id,
});
