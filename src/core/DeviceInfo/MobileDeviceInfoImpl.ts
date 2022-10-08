import {BundleId, DeviceInfo, Semver} from '../index';
import {getReadableVersion, getBundleId} from 'react-native-device-info';

export default class MobileDeviceInfoImpl implements DeviceInfo {
  getAppVersionWithBuildNumber() {
    return getReadableVersion() as Semver;
  }

  getBundleId() {
    return getBundleId() as BundleId;
  }
}
