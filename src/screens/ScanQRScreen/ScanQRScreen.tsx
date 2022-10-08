import React, {useCallback} from 'react';
import {Button, Layout} from '@ui-kitten/components';
import {observer} from 'mobx-react-lite';
import {StyleSheet} from 'react-native';
import {
  BarCodeScanningResult,
  Camera,
  CameraType,
  PermissionResponse,
} from 'expo-camera';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {useThrottledCallback} from 'use-debounce';
import {useWindowDimensions} from '../../core/WindowDimensions';
import {expr} from 'mobx-utils';

const BAR_CODE_SCANNER_SETTINGS = {
  barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
};

export type ScanQRScreenProps = {
  onBarCodeScanned: (data: BarCodeScanningResult) => void;
  getIsTransitioning: () => boolean;
  cameraPermissions: PermissionResponse | undefined;
  onRequestPermissionPress: () => void;
};

export default observer(function ScanQRScreen({
  onBarCodeScanned,
  getIsTransitioning,
  cameraPermissions,
  onRequestPermissionPress,
}: ScanQRScreenProps) {
  const handleBarCodeScanned = useCallback(
    (data: BarCodeScanningResult) => onBarCodeScanned(data),
    [onBarCodeScanned],
  );
  const handleBarCodeScannedThrottled = useThrottledCallback(
    handleBarCodeScanned,
    1000,
    {trailing: false},
  );
  const title = cameraPermissions?.canAskAgain
    ? 'Grant access to camera'
    : 'Open settings';
  const isGranted = expr(() => cameraPermissions?.granted || false);
  const visibleCamera = expr(() => !getIsTransitioning());
  const {width, height} = useWindowDimensions();
  const size = expr(() => Math.min(width, height) * 0.8);
  return (
    <Layout style={styles.root} level="1">
      {isGranted ? (
        visibleCamera && (
          <Layout level="4" style={{width: size, height: size}}>
            <Camera
              type={CameraType.back}
              barCodeScannerSettings={BAR_CODE_SCANNER_SETTINGS}
              onBarCodeScanned={handleBarCodeScannedThrottled}
              style={StyleSheet.absoluteFillObject}
            />
          </Layout>
        )
      ) : (
        <Button onPress={onRequestPermissionPress}>{title}</Button>
      )}
    </Layout>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
});
