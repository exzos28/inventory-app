import {Platform} from 'react-native';

import {Configuration} from '../Configuration';
import {ErrorRepository} from '../ErrorRepository';
import {Service} from '../structure';
import AndroidAppleOAuth2ProviderService from './AndroidAppleOAuth2ProviderService';
import {AppleOAuth2Provider} from './AppleOAuth2Provider';
import IosAppleOAuth2ProviderService from './IosAppleOAuth2ProviderService';

export default class MobileAppleOAuth2ProviderServiceFactory {
  constructor(
    private readonly _root: {
      readonly configuration: Configuration;
      readonly errorRepository: ErrorRepository;
    },
  ) {}

  create(): AppleOAuth2Provider & Service {
    if (Platform.OS === 'android') {
      return new AndroidAppleOAuth2ProviderService(this._root);
    } else {
      return new IosAppleOAuth2ProviderService(this._root);
    }
  }
}
