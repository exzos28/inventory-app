import React, {useCallback, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {FindItemScreen} from '../../screens/FindItemScreen';
import {RootStackBindingProps} from './RootStackBindingProps';
import {ITEMS} from '../../MOCK';
import {ItemType} from '../../tempTypes';

export default observer(function FindItemBinding({
  navigation,
}: RootStackBindingProps<'FindItem'>) {
  const [searchValue, setSearchValue] = useState('');
  const goToItemDetails = useCallback(
    (item: ItemType) => navigation.navigate('ItemDetails', {id: item.id}),
    [navigation],
  );
  return (
    <FindItemScreen
      searchValue={searchValue}
      onChangeText={setSearchValue}
      onItemPress={goToItemDetails}
      data={ITEMS}
    />
  );
});
