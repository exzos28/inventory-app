import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {ScanQRScreen} from '../../screens/ScanQRScreen';
import {BarCodeScanningResult} from 'expo-camera';
import useNavigationGetIsTransitioning from '../useNavigationGetIsTransitioning';
import useNavigationGetIsFocused from '../useNavigationGetIsFocused';
import {NOT_FOUND_ERROR, useRoot} from '../../core';
import useGoToUnknownError from './useGoToUnknownError';
import {Alert} from 'react-native';
export type ScanQRBindingProps = RootStackBindingProps<'ScanQR'>;

// TODO l10n
export default observer(function ScanQRBinding({
  navigation,
}: ScanQRBindingProps) {
  const {itemHelper} = useRoot();
  const getIsTransitioning = useNavigationGetIsTransitioning(navigation);
  const getIsFocused = useNavigationGetIsFocused();
  const goToUnknownError = useGoToUnknownError(navigation);
  const onBarCodeScanned = useCallback(
    async ({data}: BarCodeScanningResult) => {
      const item_ = await itemHelper.getByQr(data);
      if (!item_.success && item_.left.kind === NOT_FOUND_ERROR) {
        return Alert.alert('Warning!', 'Item not found');
      }
      if (!item_.success) {
        return goToUnknownError(item_.left);
      }
      navigation.navigate('ItemDetails', {id: item_.right.id});
    },
    [goToUnknownError, itemHelper, navigation],
  );

  return (
    <ScanQRScreen
      getIsFocused={getIsFocused}
      onBarCodeScanned={onBarCodeScanned}
      getIsTransitioning={getIsTransitioning}
    />
  );
});
