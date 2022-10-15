import React, {useCallback, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {FindItemScreen} from '../../screens/FindItemScreen';
import {RootStackBindingProps} from './RootStackBindingProps';

export default observer(function FindItemBinding({
  navigation,
}: RootStackBindingProps<'FindItem'>) {
  const [searchValue, setSearchValue] = useState('');
  const goToItemDetails = useCallback(
    () => navigation.navigate('ItemDetails'),
    [navigation],
  );
  return (
    <FindItemScreen
      searchValue={searchValue}
      onChangeText={setSearchValue}
      goToItemDetails={goToItemDetails}
    />
  );
});
