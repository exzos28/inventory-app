import {RootServiceFactory, Root, Core, Service} from '../core';
import MobileRootService from './MobileRootService';

export default class MobileRootServiceFactoryImpl
  implements RootServiceFactory
{
  create(core: Core): Root & Service {
    return new MobileRootService(core);
  }
}
