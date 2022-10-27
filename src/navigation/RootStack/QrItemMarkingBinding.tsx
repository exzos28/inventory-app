import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {ScanQRScreen} from '../../screens/ScanQRScreen';
import useNavigationGetIsTransitioning from '../useNavigationGetIsTransitioning';
import useNavigationGetIsFocused from '../useNavigationGetIsFocused';
import {BarCodeScanningResult} from 'expo-camera';
import {Alert} from 'react-native';

export default observer(function QrItemMarkingBinding({
  navigation,
}: RootStackBindingProps<'QrItemMarking'>) {
  const getIsTransitioning = useNavigationGetIsTransitioning(navigation);
  const getIsFocused = useNavigationGetIsFocused();
  const onBarCodeScanned = useCallback(
    (data: BarCodeScanningResult) => {
      Alert.alert('Result', JSON.stringify(data));
      navigation.popToTop();
    },
    [navigation],
  );
  return (
    <ScanQRScreen
      getIsTransitioning={getIsTransitioning}
      getIsFocused={getIsFocused}
      onBarCodeScanned={onBarCodeScanned}
    />
  );
});
