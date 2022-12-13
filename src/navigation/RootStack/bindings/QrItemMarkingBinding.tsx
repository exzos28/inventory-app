import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from '../RootStackBindingProps';
import {ScanQRScreen} from '../../../screens/ScanQRScreen';
import useNavigationGetIsTransitioning from '../../hooks/useNavigationGetIsTransitioning';
import useNavigationGetIsFocused from '../../hooks/useNavigationGetIsFocused';
import {BarCodeScanningResult} from 'expo-camera';
import {Alert} from 'react-native';
import {useRoot, useStrings} from '../../../core';
import useGoToUnknownError from '../useGoToUnknownError';

export default observer(function QrItemMarkingBinding({
  navigation,
  route,
}: RootStackBindingProps<'QrItemMarking'>) {
  const {itemHelper} = useRoot();
  const strings = useStrings();
  const getIsTransitioning = useNavigationGetIsTransitioning(navigation);
  const getIsFocused = useNavigationGetIsFocused();
  const {id} = route.params || {};
  const goToUnknownError = useGoToUnknownError(navigation);
  const updateQr = useCallback(
    async (newQr: string) => {
      if (!id) {
        return;
      }
      const update_ = await itemHelper.update({id, item: {qrKey: newQr}});
      if (!update_.success) {
        return goToUnknownError(update_.left);
      }
      navigation.popToTop();
    },
    [goToUnknownError, id, itemHelper, navigation],
  );
  const onBarCodeScanned = useCallback(
    async ({data}: BarCodeScanningResult) => {
      Alert.alert(
        strings['common.warning'],
        strings['qrItemMarkingScreen.changeAlert.description'],
        [
          {text: strings['common.cancel'], style: 'destructive'},
          {text: strings['common.yes'], onPress: () => updateQr(data)},
        ],
      );
    },
    [strings, updateQr],
  );
  return (
    <ScanQRScreen
      getIsTransitioning={getIsTransitioning}
      getIsFocused={getIsFocused}
      onBarCodeScanned={onBarCodeScanned}
    />
  );
});
