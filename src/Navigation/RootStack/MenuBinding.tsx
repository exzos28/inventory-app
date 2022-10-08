import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {MenuScreen} from '../../screens/MenuScreen';

export type MenuScreenBindingProps = RootStackBindingProps<'Menu'>;

export default observer(function MenuScreenBinding(
  props: MenuScreenBindingProps,
) {
  const {navigation} = props;
  const onScanPress = useCallback(() => {
    navigation.navigate('ScanQR');
  }, [navigation]);
  return <MenuScreen onScanPress={onScanPress} />;
});
