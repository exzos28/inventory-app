import React, {useCallback, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {ScanQRScreen} from '../../screens/ScanQRScreen';
import {
  BarCodeScanningResult,
  getCameraPermissionsAsync,
  PermissionResponse,
  requestCameraPermissionsAsync,
} from 'expo-camera';
import {Alert, Linking, Platform} from 'react-native';
import useNavigationGetIsTransitioning from '../useNavigationGetIsTransitioning';
import useNavigationGetIsFocused from '../useNavigationGetIsFocused';
import {useRoot} from '../../core';
import {reaction} from 'mobx';
import {PermissionStatus} from 'expo-modules-core';
import {APP_WINDOW_ACTIVE} from '../../core/AppWindow';

export type ScanQRBindingProps = RootStackBindingProps<'ScanQR'>;

export default observer(function ScanQRBinding(props: ScanQRBindingProps) {
  const {navigation} = props;
  const getIsTransitioning = useNavigationGetIsTransitioning(navigation);
  const getIsFocused = useNavigationGetIsFocused();
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
  const onBarCodeScanned = useCallback(
    (data: BarCodeScanningResult) => {
      Alert.alert('Data:', JSON.stringify(data));
      navigation.goBack();
    },
    [navigation],
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
  return (
    <ScanQRScreen
      onBarCodeScanned={onBarCodeScanned}
      cameraPermissions={cameraPermissions}
      getIsTransitioning={getIsTransitioning}
      onRequestPermissionPress={onRequestPermissionPress}
    />
  );
});
