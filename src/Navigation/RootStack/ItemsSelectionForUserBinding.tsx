import React, {useCallback, useMemo, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {ItemId, ItemType} from '../../tempTypes';
import {ItemsSelectionForUserScreen} from '../../screens/ItemsSelectionForUserScreen';
import {ITEMS} from '../../MOCK';
import {action, observable} from 'mobx';

export default observer(function ItemsSelectionForUserBinding({
  navigation,
  route,
}: RootStackBindingProps<'ItemsSelectionForUser'>) {
  const {forUser} = route.params;
  const [selectedItemsSet] = useState(() => observable.set<ItemId>([]));
  const getSelectedItems = useCallback(
    () => [...selectedItemsSet.values()],
    [selectedItemsSet],
  );
  const [searchValue, setSearchValue] = useState('');
  const onItemPress = useMemo(
    () =>
      action(({id}: ItemType) => {
        const exists = selectedItemsSet.has(id);
        if (exists) {
          selectedItemsSet.delete(id);
        } else {
          selectedItemsSet.add(id);
        }
      }),
    [selectedItemsSet],
  );
  const goToItemDetails = useCallback(
    (item: ItemType) => navigation.navigate('ItemDetails', {id: item.id}),
    [navigation],
  );
  const onSubmitPress = useCallback(
    () =>
      navigation.navigate('ConfirmItemsTransfer', {
        items: getSelectedItems(),
        forUser: forUser,
      }),
    [forUser, getSelectedItems, navigation],
  );
  return (
    <ItemsSelectionForUserScreen
      data={ITEMS}
      searchValue={searchValue}
      onChangeText={setSearchValue}
      onItemPress={onItemPress}
      onItemLongPress={goToItemDetails}
      getSelectedItems={getSelectedItems}
      onSubmitPress={onSubmitPress}
    />
  );
});
