import {Core} from '../Core';
import {MobileDeviceInfoImpl} from '../DeviceInfo';
import {JsonKeyValueMap, JsonKeyValueStoreService} from '../JsonKeyValueStore';
import {
  KeyValueMap,
  KeyValueStore,
  MobileKeyValueStoreImpl,
  SecureKeyValueMap,
  SecureKeyValueStoreFactory,
} from '../KeyValueStore';
import {MobileAppleOAuth2ProviderServiceFactory} from '../OAuth2Provider';
import {batchDisposers, Service} from '../structure';
import BaseRootService from './BaseRootService';
import {Root} from './Root';

export default class MobileRootService
  extends BaseRootService
  implements Root, Service
{
  constructor(protected readonly _core: Core) {
    super(_core);
  }

  readonly deviceInfo = new MobileDeviceInfoImpl();

  readonly keyValueStore = new MobileKeyValueStoreImpl<KeyValueMap>(this);
  readonly jsonKeyValueStore = new JsonKeyValueStoreService(
    this,
    this.keyValueStore as KeyValueStore<JsonKeyValueMap>,
  );
  private readonly _secureKeyValueStoreFactory =
    new SecureKeyValueStoreFactory<SecureKeyValueMap>(this);
  readonly secureKeyValueStore = this._secureKeyValueStoreFactory.create();
  readonly jsonSecureKeyValueStore = new JsonKeyValueStoreService(
    this,
    this.secureKeyValueStore,
  );

  private readonly _appleOAuth2ProviderFactory =
    new MobileAppleOAuth2ProviderServiceFactory(this);
  readonly appleOAuth2Provider = this._appleOAuth2ProviderFactory.create();

  subscribe() {
    return batchDisposers(super.subscribe());
  }
}
