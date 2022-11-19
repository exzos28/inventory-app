import {AppLifecycle} from '../AppLifecycle';
import {ErrorRepository} from '../ErrorRepository';
import {Json} from '../Json';
import {Appearance} from '../Appearance';
import {Configuration} from '../Configuration';

export interface Core {
  readonly initialized: boolean;
  readonly appLifecycle: AppLifecycle;
  readonly errorRepository: ErrorRepository;
  readonly configuration: Configuration;
  readonly json: Json;
  readonly appearance: Appearance;
}
