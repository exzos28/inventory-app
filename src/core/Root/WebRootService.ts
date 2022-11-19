import HttpImpl from '../Http/HttpImpl';
import {
  JsonKeyValueMap,
  JsonKeyValueStore,
  JsonKeyValueStoreService,
  JsonSecureKeyValueMap,
} from '../JsonKeyValueStore';
import {
  KeyValueMap,
  KeyValueStore,
  SecureKeyValueMap,
  WebKeyValueStoreService,
} from '../KeyValueStore';
import {WebAppleOAuth2ProviderService} from '../OAuth2Provider';
import {batchDisposers, Service} from '../structure';
import BaseRootService from './BaseRootService';
import {Root} from './Root';
import {WebDeviceInfoImpl} from '../DeviceInfo';

export default class WebRootService
  extends BaseRootService
  implements Root, Service
{
  readonly deviceInfo = new WebDeviceInfoImpl();
  readonly keyValueStore = new WebKeyValueStoreService<KeyValueMap>(this);
  readonly secureKeyValueStore = this
    .keyValueStore as unknown as KeyValueStore<SecureKeyValueMap>;
  readonly jsonKeyValueStore = new JsonKeyValueStoreService(
    this,
    this.keyValueStore as KeyValueStore<JsonKeyValueMap>,
  );
  readonly jsonSecureKeyValueStore = this
    .jsonKeyValueStore as unknown as JsonKeyValueStore<JsonSecureKeyValueMap>;
  readonly appleOAuth2Provider = new WebAppleOAuth2ProviderService(this);
  readonly http = new HttpImpl(this);

  subscribe() {
    return batchDisposers(
      super.subscribe(),
      this.keyValueStore.subscribe(),
      this.jsonKeyValueStore.subscribe(),
      this.appleOAuth2Provider.subscribe(),
    );
  }
}
