import {useCallback, useEffect} from 'react';

import {useIdTokenAuthRequest} from 'expo-auth-session/providers/google';

import {useRoot} from '../../core/Root/hooks';
import shouldUseNativeAuth from './shouldUseNativeAuth';
import useNativeGoogleAuth from './useNativeGoogleAuth';
import {Alert} from 'react-native';

export default function useGoogleAuth(
  onGoogleIdTokenReceived: (idToken: string) => void,
) {
  const {configuration, specialLocation} = useRoot();
  const values = configuration.values;
  const redirectUri = specialLocation.getOauthRedirect();
  const nativeGoogleAuth = useNativeGoogleAuth(onGoogleIdTokenReceived);
  const [, browserResponse, browserPromptAsync] = useIdTokenAuthRequest({
    iosClientId: values.googleMobileOauthClientId,
    androidClientId: values.googleMobileOauthClientId,
    webClientId: values.googleWebOauthClientId,
    redirectUri,
  });
  useEffect(() => {
    if (browserResponse?.type === 'success') {
      const {params} = browserResponse;
      // https://github.com/expo/expo/issues/12808
      if (params.id_token) {
        const responseRaw = JSON.stringify(browserResponse, null, 1);
        Alert.alert('Response', responseRaw);
        console.log(responseRaw);
        onGoogleIdTokenReceived(params.id_token);
      }
    }
  }, [browserResponse, onGoogleIdTokenReceived]);

  return useCallback(async () => {
    if (await shouldUseNativeAuth()) {
      await nativeGoogleAuth();
    } else {
      await browserPromptAsync();
    }
  }, [browserPromptAsync, nativeGoogleAuth]);
}
