import {useCallback} from 'react';

import {useRoot} from '../../core/Root/hooks';
import useGoogleAuth from './useGoogleAuth';
import {GoogleIdToken} from '../../core';

export enum OAuthVariant {
  Apple,
  Google,
}

export default function useOnLogInPress() {
  const {authHelper} = useRoot();
  const signInWithGoogle = useCallback(
    (idToken: string) =>
      authHelper.signInByOAuth2({
        provider: 'google',
        id_token: idToken as GoogleIdToken,
      }),
    [authHelper],
  );
  const initiateGoogleAuth = useGoogleAuth(signInWithGoogle);
  return useCallback(
    async (_: OAuthVariant) => {
      switch (_) {
        // case OAuthVariant.Apple:
        //   appleOAuth2Provider.signIn();
        //   break;
        case OAuthVariant.Google:
          await initiateGoogleAuth();
          break;
      }
    },
    // [appleOAuth2Provider, initiateGoogleAuth],
    [initiateGoogleAuth],
  );
}
