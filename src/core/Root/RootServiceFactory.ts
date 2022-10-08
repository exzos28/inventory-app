import {Root} from './Root';
import {Service} from '../structure';
import {Core} from '../Core';

export interface RootServiceFactory {
  create(core: Core): Root & Service;
}
