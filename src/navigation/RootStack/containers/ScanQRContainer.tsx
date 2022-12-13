import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {ScanQRScreen} from '../../../screens/ScanQRScreen';
import {BarCodeScanningResult} from 'expo-camera';
import {GlobalError, NOT_FOUND_ERROR, useRoot, useStrings} from '../../../core';
import {Alert} from 'react-native';
import {ItemId} from '../../../core/HadesServer';

export type ScanQrContainerProps = {
  onUnknownError: (error: GlobalError) => void;
  onSuccessScan: (id: ItemId) => void;
  getIsTransitioning: () => boolean;
  getIsFocused: () => boolean;
};

export default observer(function ScanQrContainer({
  onUnknownError,
  onSuccessScan,
  getIsTransitioning,
  getIsFocused,
}: ScanQrContainerProps) {
  const {itemHelper} = useRoot();
  const strings = useStrings();
  const onBarCodeScanned = useCallback(
    async ({data}: BarCodeScanningResult) => {
      const item_ = await itemHelper.getByQr(data);
      if (!item_.success && item_.left.kind === NOT_FOUND_ERROR) {
        return Alert.alert(
          strings['common.warning'],
          strings['scanQrScreen.alert.itemNotFound'],
        );
      }
      if (!item_.success) {
        return onUnknownError(item_.left);
      }
      onSuccessScan(item_.right.id);
    },
    [itemHelper, onSuccessScan, onUnknownError, strings],
  );

  return (
    <ScanQRScreen
      getIsFocused={getIsFocused}
      onBarCodeScanned={onBarCodeScanned}
      getIsTransitioning={getIsTransitioning}
    />
  );
});
