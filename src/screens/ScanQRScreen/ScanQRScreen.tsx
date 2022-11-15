import React, {useCallback, useEffect, useState} from 'react';
import {Button, Icon, IconProps, Layout, Text} from '@ui-kitten/components';
import {observer} from 'mobx-react-lite';
import {Linking, Platform, StyleSheet, View} from 'react-native';
import {
  BarCodeScanningResult,
  Camera,
  CameraType,
  getCameraPermissionsAsync,
  PermissionResponse,
  requestCameraPermissionsAsync,
} from 'expo-camera';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {useThrottledCallback} from 'use-debounce';
import {expr} from 'mobx-utils';
import {useRoot, useStrings, variance} from '../../core';
import {Space} from '../../components';
import {reaction} from 'mobx';
import {PermissionStatus} from 'expo-modules-core';
import {APP_WINDOW_ACTIVE} from '../../core/AppWindow';

const BAR_CODE_SCANNER_SETTINGS = {
  barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
};

export type ScanQRScreenProps = {
  getIsFocused: () => boolean;
  onBarCodeScanned: (data: BarCodeScanningResult) => void;
  getIsTransitioning: () => boolean;
};

// TODO move to scene
export default observer(function ScanQRScreen({
  getIsFocused,
  getIsTransitioning,
  onBarCodeScanned,
}: ScanQRScreenProps) {
  const strings = useStrings();
  const {appWindow} = useRoot();
  const [cameraPermissions, setCameraPermissions] =
    useState<PermissionResponse>();
  const requestPermission = useCallback(async () => {
    try {
      const response = await requestCameraPermissionsAsync();
      setCameraPermissions(response);
    } catch (ignore) {}
  }, []);

  useEffect(
    () =>
      reaction(
        () => getIsFocused(),
        async isFocused => {
          if (isFocused) {
            try {
              const response = await getCameraPermissionsAsync();
              setCameraPermissions(response);
              if (
                response.canAskAgain &&
                response.status === PermissionStatus.UNDETERMINED
              ) {
                await requestPermission();
              }
            } catch (ignore) {}
          }
        },
        {fireImmediately: true},
      ),
    [getIsFocused, requestPermission],
  );
  useEffect(
    () =>
      appWindow.updates.listen(APP_WINDOW_ACTIVE, async () => {
        try {
          const response = await getCameraPermissionsAsync();
          setCameraPermissions(response);
        } catch (ignore) {}
      }),
    [appWindow],
  );

  const onRequestPermissionPress = useCallback(async () => {
    if (cameraPermissions?.canAskAgain) {
      await requestPermission();
    } else {
      if (Platform.OS === 'ios') {
        await Linking.openURL('app-settings:');
      } else if (Platform.OS === 'android') {
        await Linking.openSettings();
      }
    }
  }, [cameraPermissions, requestPermission]);

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
    ? strings['scanQrScreen.grantAccessButton']
    : strings['scanQrScreen.openSettingsButton'];
  const isGranted = expr(() => cameraPermissions?.granted || false);
  const visibleCamera = expr(() => !getIsTransitioning());

  return (
    <RootLayout style={styles.root} level="1">
      {isGranted ? (
        visibleCamera && (
          <CameraLayout level="4">
            <Camera
              type={CameraType.back}
              barCodeScannerSettings={BAR_CODE_SCANNER_SETTINGS}
              onBarCodeScanned={handleBarCodeScannedThrottled}
              style={StyleSheet.absoluteFillObject}
            />
          </CameraLayout>
        )
      ) : (
        <ButtonView>
          <Space>
            <WarningText category="label">
              {strings['scanQrScreen.warningTitle']}
            </WarningText>
            <Button
              size="large"
              accessoryLeft={SettingsIcon}
              onPress={onRequestPermissionPress}>
              {title}
            </Button>
          </Space>
        </ButtonView>
      )}
    </RootLayout>
  );
});

const SettingsIcon = (props: IconProps) => (
  <Icon name="settings-2-outline" {...props} />
);

const RootLayout = variance(Layout)(() => ({
  root: {
    flex: 1,
  },
}));

const CameraLayout = variance(Layout)(() => ({
  root: {
    flex: 1,
  },
}));

const ButtonView = variance(View)(() => ({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const WarningText = variance(Text)(() => ({
  root: {
    fontSize: 20,
  },
}));

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
