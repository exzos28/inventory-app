import {
  Root,
  Service,
  BaseRootService,
  Core,
  batchDisposers,
  MobileDeviceInfoImpl,
  MobileLinkingOptionsProviderImpl,
  MobileLocationService,
} from '../core';

export default class MobileRootService
  extends BaseRootService
  implements Root, Service
{
  constructor(protected readonly _core: Core) {
    super(_core);
  }

  readonly deviceInfo = new MobileDeviceInfoImpl();
  readonly location = new MobileLocationService(this);
  readonly locationSource = this.location;
  readonly linkingOptionsProvider = new MobileLinkingOptionsProviderImpl(this);

  subscribe() {
    return batchDisposers(super.subscribe(), this.location.subscribe());
  }
}
