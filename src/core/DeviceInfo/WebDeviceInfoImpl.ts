import rootPackageJson from '../../../package.json';
import {BundleId, Semver} from '../units';
import {DeviceInfo} from './DeviceInfo';

export default class WebDeviceInfoImpl implements DeviceInfo {
  getBundleId() {
    return 'com.robox' as BundleId;
  }

  getAppVersionWithBuildNumber() {
    return rootPackageJson.version as Semver;
  }
}
