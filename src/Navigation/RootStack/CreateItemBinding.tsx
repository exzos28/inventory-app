import React from 'react';
import {observer} from 'mobx-react-lite';
import {CreateItemScreen} from '../../screens/CreateItemScreen';
import {RootStackBindingProps} from './RootStackBindingProps';

export default observer(function CreateItemBinding({
  navigation,
}: RootStackBindingProps<'CreateItem'>) {
  return <CreateItemScreen onCreatePress={navigation.goBack} />;
});
