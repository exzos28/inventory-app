import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {ScanQRScreen} from '../../../screens/ScanQRScreen';
import {BarCodeScanningResult} from 'expo-camera';
import {GlobalError, NOT_FOUND_ERROR, useRoot} from '../../../core';
import {Alert} from 'react-native';
import {ItemId} from '../../../core/HadesServer';

export type ScanQrContainerProps = {
  onUnknownError: (error: GlobalError) => void;
  onSuccessScan: (id: ItemId) => void;
  getIsTransitioning: () => boolean;
  getIsFocused: () => boolean;
};

// TODO l10n
export default observer(function ScanQrContainer({
  onUnknownError,
  onSuccessScan,
  getIsTransitioning,
  getIsFocused,
}: ScanQrContainerProps) {
  const {itemHelper} = useRoot();
  const onBarCodeScanned = useCallback(
    async ({data}: BarCodeScanningResult) => {
      const item_ = await itemHelper.getByQr(data);
      if (!item_.success && item_.left.kind === NOT_FOUND_ERROR) {
        return Alert.alert('Warning!', 'Item not found');
      }
      if (!item_.success) {
        return onUnknownError(item_.left);
      }
      onSuccessScan(item_.right.id);
    },
    [itemHelper, onSuccessScan, onUnknownError],
  );

  return (
    <ScanQRScreen
      getIsFocused={getIsFocused}
      onBarCodeScanned={onBarCodeScanned}
      getIsTransitioning={getIsTransitioning}
    />
  );
});
