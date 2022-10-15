import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default async () => {
  try {
    return await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: false,
    });
  } catch (ignore) {
    return false;
  }
};
