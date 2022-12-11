import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {SelectItemsForTransferScreen} from '../../screens/SelectItemsForTransferScreen';
import {action, autorun, observable} from 'mobx';
import {ItemId} from '../../core/HadesServer';
import {Item} from '../../core/ItemHelper';
import {FindItemStateImpl} from '../../core/FindItemState';
import useNavigationGetIsFocused from '../useNavigationGetIsFocused';
import {PENDING, REJECTED, useRoot} from '../../core';
import {ErrorScreen} from '../../screens/ErrorScreen';

export default observer(function SelectItemsForTransferBinding({
  navigation,
  route,
}: RootStackBindingProps<'SelectItemsForTransfer'>) {
  const {forUser} = route.params;
  const root = useRoot();
  const [pageState] = useState(() => new FindItemStateImpl(root));
  const [searchValue, setSearchValue] = useState('');
  const [selectedItemsSet] = useState(() => observable.set<ItemId>([]));
  const getSelectedIds = useCallback(
    () => [...selectedItemsSet.values()],
    [selectedItemsSet],
  );

  const {state} = pageState;
  const getIsFocused = useNavigationGetIsFocused();
  useEffect(
    () => autorun(() => getIsFocused() && pageState.fetch()),
    [getIsFocused, pageState],
  );

  const goToItemDetails = useCallback(
    (item: Item) => navigation.navigate('ItemDetails', {id: item.id}),
    [navigation],
  );
  const goToCreateItem = useCallback(
    () => navigation.navigate('CreateItem'),
    [navigation],
  );
  const onItemPress = useMemo(
    () =>
      action(({id}: Item) => {
        const exists = selectedItemsSet.has(id);
        if (exists) {
          selectedItemsSet.delete(id);
        } else {
          selectedItemsSet.add(id);
        }
      }),
    [selectedItemsSet],
  );
  const onSubmitPress = useCallback(
    () =>
      navigation.navigate('ConfirmItemsTransfer', {
        items: getSelectedIds(),
        forUser: forUser,
      }),
    [forUser, getSelectedIds, navigation],
  );
  if (state === undefined || state.status === PENDING) {
    return null;
  }
  if (state.status === REJECTED) {
    return (
      <ErrorScreen
        raw={state.error}
        onReturnPress={navigation.goBack}
        description={state.error.description}
      />
    );
  }
  return (
    <SelectItemsForTransferScreen
      data={state.result}
      searchValue={searchValue}
      onChangeText={setSearchValue}
      onItemPress={onItemPress}
      onItemLongPress={goToItemDetails}
      getSelectedIds={getSelectedIds}
      onSubmitPress={onSubmitPress}
      onCreatePress={goToCreateItem}
    />
  );
});
