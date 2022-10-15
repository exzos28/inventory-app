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
  return (
    <MenuScreen
      goToFindUser={goToFindUser}
      goToFindItem={goToFindItem}
      goToCreateItem={goToCreateItem}
      onScanPress={onScanPress}
    />
  );
});
