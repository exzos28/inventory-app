import {BundleId, Semver} from '../units';

export interface DeviceInfo {
  getAppVersionWithBuildNumber(): Semver;
  getBundleId(): BundleId;
}
