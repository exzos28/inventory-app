import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {MenuScreen} from '../../screens/MenuScreen';

export default observer(function MenuScreenBinding({
  navigation,
}: RootStackBindingProps<'Menu'>) {
  const onScanPress = useCallback(
    () => navigation.navigate('ScanQR'),
    [navigation],
  );
  const goToFindUser = useCallback(
    () => navigation.navigate('FindUser'),
    [navigation],
  );
  const goToFindItem = useCallback(
    () => navigation.navigate('FindItem'),
    [navigation],
  );
  const goToCreateItem = useCallback(
    () => navigation.navigate('CreateItem'),
    [navigation],
  );
  const goToSelectUserToTransfer = useCallback(
    () => navigation.navigate('SelectUserToTransfer'),
    [navigation],
  );
  const goToSelectItemForQrMarking = useCallback(
    () => navigation.navigate('SelectItemForQrMarking'),
    [navigation],
  );
  return (
    <MenuScreen
      onFindUserPress={goToFindUser}
      onFindItemPress={goToFindItem}
      onCreateItemPress={goToCreateItem}
      onSelectUserToTransferPress={goToSelectUserToTransfer}
      onSelectItemForQrMarking={goToSelectItemForQrMarking}
      onScanPress={onScanPress}
    />
  );
});
