import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from '../RootStackBindingProps';
import useNavigationGetIsTransitioning from '../../hooks/useNavigationGetIsTransitioning';
import useNavigationGetIsFocused from '../../hooks/useNavigationGetIsFocused';
import useGoToUnknownError from '../useGoToUnknownError';
import ScanQrContainer from '../containers/ScanQRContainer';
import {ItemId} from '../../../core/HadesServer';

export default observer(function ScanQRForStocktakingBinding({
  navigation,
}: RootStackBindingProps<'ScanQRForStocktaking'>) {
  const getIsTransitioning = useNavigationGetIsTransitioning(navigation);
  const getIsFocused = useNavigationGetIsFocused();
  const goToUnknownError = useGoToUnknownError(navigation);
  const onSuccessScan = useCallback(
    (id: ItemId) =>
      navigation.navigate('Stocktaking', {scannedValue: {itemId: id}}),
    [navigation],
  );
  return (
    <ScanQrContainer
      getIsFocused={getIsFocused}
      getIsTransitioning={getIsTransitioning}
      onUnknownError={goToUnknownError}
      onSuccessScan={onSuccessScan}
    />
  );
});
