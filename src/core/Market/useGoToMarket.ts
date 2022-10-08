import {Linking} from 'react-native';
import {getBundleId} from 'react-native-device-info';
import {useCallback} from 'react';

export function useGoToMarket() {
  return useCallback(async () => {
    try {
      await Linking.openURL(`market://details?id=${getBundleId()}`);
    } catch (ignore) {}
  }, []);
}

export function useGoToMarketReviews() {
  return useCallback(async () => {
    try {
      await Linking.openURL(
        `market://details?id=${getBundleId()}&showAllReviews=true`,
      );
    } catch (ignore) {}
  }, []);
}
