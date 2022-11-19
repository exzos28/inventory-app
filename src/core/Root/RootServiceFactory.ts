import {Platform} from 'react-native';

import {Core} from '../Core';
import {Service} from '../structure';
import MobileRootService from './MobileRootService';
import WebRootService from './WebRootService';
import {Root} from './Root';

export default class RootServiceFactory {
  create(core: Core): Root & Service {
    if (Platform.OS === 'web') {
      return new WebRootService(core);
    } else {
      return new MobileRootService(core);
    }
  }
}
