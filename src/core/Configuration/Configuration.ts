import {Opaque, ReadonlyDeep} from 'type-fest';

import {Bound} from '../fp';
import {ConfigurationValues} from './ConfigurationValues';

export interface Configuration {
  readonly current: ReadonlyDeep<Environment>;
  readonly values: ReadonlyDeep<ConfigurationValues>;
  readonly defaultEnvironment: ReadonlyDeep<DefaultEnvironment>;
  readonly customEnvironments: ReadonlyDeep<CustomEnvironment[]>;
  setEnvironment(id?: EnvironmentId): Promise<void>;
  readonly nextEnvironment: Bound<() => Promise<void>, Configuration>;
  createEnvironment(
    patch: ReadonlyDeep<Partial<ConfigurationValues>>,
  ): Promise<CustomEnvironment>;
  deleteEnvironment(id: EnvironmentId): Promise<void>;

  hasMultipleEnvironments(): boolean;
}

export type Environment = DefaultEnvironment | CustomEnvironment;

export type DefaultEnvironment = {
  values: ConfigurationValues;
  isDefault: true;
};

export type CustomEnvironment = {
  values: ConfigurationValues;
  isDefault: false;
  id: EnvironmentId;
};

export type EnvironmentId = Opaque<number, 'EnvironmentId'>;
