import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from '../RootStackBindingProps';
import {ScanQRScreen} from '../../../screens/ScanQRScreen';
import useNavigationGetIsTransitioning from '../../hooks/useNavigationGetIsTransitioning';
import useNavigationGetIsFocused from '../../hooks/useNavigationGetIsFocused';
import {BarCodeScanningResult} from 'expo-camera';
import {Alert} from 'react-native';
import {useRoot} from '../../../core';
import useGoToUnknownError from '../useGoToUnknownError';

export default observer(function QrItemMarkingBinding({
  navigation,
  route,
}: RootStackBindingProps<'QrItemMarking'>) {
  const {itemHelper} = useRoot();
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
      // TODO l10n
      Alert.alert(
        'Ostrzeżenie',
        'Czy na pewno chcesz przypisać ten kod QR do tego przedmiotu?',
        [
          {text: 'Nie', style: 'destructive'},
          {text: 'Tak', onPress: () => updateQr(data)},
        ],
      );
    },
    [updateQr],
  );
  return (
    <ScanQRScreen
      getIsTransitioning={getIsTransitioning}
      getIsFocused={getIsFocused}
      onBarCodeScanned={onBarCodeScanned}
    />
  );
});
