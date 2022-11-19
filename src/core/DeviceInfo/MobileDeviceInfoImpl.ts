import {getBundleId, getReadableVersion} from 'react-native-device-info';

import {BundleId, Semver} from '../units';
import {DeviceInfo} from './DeviceInfo';

export default class MobileDeviceInfoImpl implements DeviceInfo {
  getAppVersionWithBuildNumber() {
    return getReadableVersion() as Semver;
  }

  getBundleId() {
    return getBundleId() as BundleId;
  }
}
