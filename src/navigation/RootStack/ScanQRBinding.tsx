import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {ScanQRScreen} from '../../screens/ScanQRScreen';
import {BarCodeScanningResult} from 'expo-camera';
import {Alert} from 'react-native';
import useNavigationGetIsTransitioning from '../useNavigationGetIsTransitioning';
import useNavigationGetIsFocused from '../useNavigationGetIsFocused';
export type ScanQRBindingProps = RootStackBindingProps<'ScanQR'>;

export default observer(function ScanQRBinding(props: ScanQRBindingProps) {
  const {navigation} = props;
  const getIsTransitioning = useNavigationGetIsTransitioning(navigation);
  const getIsFocused = useNavigationGetIsFocused();
  const onBarCodeScanned = useCallback(({data}: BarCodeScanningResult) => {
    Alert.alert('Result', JSON.stringify(data));
  }, []);

  return (
    <ScanQRScreen
      getIsFocused={getIsFocused}
      onBarCodeScanned={onBarCodeScanned}
      getIsTransitioning={getIsTransitioning}
    />
  );
});
