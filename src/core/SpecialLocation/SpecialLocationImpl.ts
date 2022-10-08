import {makeRedirectUri} from 'expo-auth-session';
import {getBundleId} from 'react-native-device-info';
import {Url} from '../units';
import {
  EXTERNAL,
  SpecialLocation,
  OAUTH_REDIRECT,
  SpecialLocator,
  UNKNOWN,
} from './SpecialLocation';
import {PREFIXES} from '../LinkingOptionsProvider/constant';

export default class SpecialLocationImpl implements SpecialLocation {
  private static readonly _NATIVE_REDIRECT_URI = `${getBundleId()}://`;

  getOauthRedirect() {
    return makeRedirectUri({
      native: SpecialLocationImpl._NATIVE_REDIRECT_URI,
    }) as Url;
  }

  parse(locator: Url): SpecialLocator {
    if (!PREFIXES.some(_ => locator.startsWith(_))) {
      return {kind: EXTERNAL};
    }
    if (locator.startsWith(SpecialLocationImpl._NATIVE_REDIRECT_URI)) {
      return {kind: OAUTH_REDIRECT};
    }
    return {kind: UNKNOWN};
  }
}
