import {useCallback, useEffect} from 'react';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {useRoot} from '../../core/Root/hooks';

export default function useNativeGoogleAuth(
  onGoogleIdTokenReceived: (token: string) => void,
) {
  const {configuration} = useRoot();
  const values = configuration.values;
  useEffect(() => {
    GoogleSignin.configure({
      // android client id does not need to be specified,
      // you only need to register certificate fingerprint in google cloud
      iosClientId: values.googleMobileOauthClientId,
      webClientId: values.googleWebOauthClientId,
    });
  }, [values]);

  return useCallback(async () => {
    await GoogleSignin.signOut();
    const userInfo = await GoogleSignin.signIn();
    if (userInfo.idToken) {
      const responseRaw = JSON.stringify(userInfo, null, 1);
      console.log(responseRaw);
      onGoogleIdTokenReceived(userInfo.idToken);
    }
  }, [onGoogleIdTokenReceived]);
}
