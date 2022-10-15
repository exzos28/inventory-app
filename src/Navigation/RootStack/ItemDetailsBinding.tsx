import React from 'react';
import {observer} from 'mobx-react-lite';
import {ItemDetailsScreen} from '../../screens/ItemDetailsScreen';
import {RootStackBindingProps} from './RootStackBindingProps';

export default observer(function ItemDetailsBinding({
  navigation,
}: RootStackBindingProps<'ItemDetails'>) {
  return <ItemDetailsScreen onTransferPress={navigation.goBack} />;
});
