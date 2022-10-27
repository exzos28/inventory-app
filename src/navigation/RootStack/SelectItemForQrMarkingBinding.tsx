import React, {useCallback, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {ITEMS} from '../../MOCK';
import {ItemType} from '../../tempTypes';
import {SelectItemForQrMarkingScreen} from '../../screens/SelectItemForQrMarking';

export default observer(function SelectItemForQrMarkingBinding({
  navigation,
}: RootStackBindingProps<'SelectItemForQrMarking'>) {
  const [searchValue, setSearchValue] = useState('');
  const goToItemDetails = useCallback(
    (item: ItemType) => navigation.navigate('ItemDetails', {id: item.id}),
    [navigation],
  );
  const goToQrItemMark = useCallback(
    (item: ItemType) => navigation.navigate('QrItemMarking', {id: item.id}),
    [navigation],
  );

  return (
    <SelectItemForQrMarkingScreen
      searchValue={searchValue}
      onChangeText={setSearchValue}
      onItemLongPress={goToItemDetails}
      onItemPress={goToQrItemMark}
      data={ITEMS}
    />
  );
});
