import {useCallback} from 'react';

// import {useRoot} from '../../core/Root/hooks';
import useGoogleAuth from './useGoogleAuth';

export enum OAuthVariant {
  Apple,
  Google,
}

export default function useOnLogInPress() {
  // const {authHelper, appleOAuth2Provider} = useRoot();
  // const signInWithGoogle = useCallback(
  //   (idToken: string) =>
  //     authHelper.signInByOAuth2({
  //       provider: 'google',
  //       token: idToken as GoogleIdToken,
  //     }),
  //   [authHelper],
  // );
  // const initiateGoogleAuth = useGoogleAuth(signInWithGoogle);
  const initiateGoogleAuth = useGoogleAuth(() => {});
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
