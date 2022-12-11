import React, {useCallback, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {SelectItemForQrMarkingScreen} from '../../screens/SelectItemForQrMarking';
import {FindItemStateImpl} from '../../core/FindItemState';
import useNavigationGetIsFocused from '../useNavigationGetIsFocused';
import {autorun} from 'mobx';
import {FULFILLED, REJECTED, useRoot} from '../../core';
import {Item} from '../../core/ItemHelper';
import {ErrorScreen} from '../../screens/ErrorScreen';

export default observer(function SelectItemForQrMarkingBinding({
  navigation,
}: RootStackBindingProps<'SelectItemForQrMarking'>) {
  const root = useRoot();
  const [pageState] = useState(() => new FindItemStateImpl(root));
  const {state} = pageState;
  const getIsFocused = useNavigationGetIsFocused();
  useEffect(
    () => autorun(() => getIsFocused() && pageState.fetch()),
    [getIsFocused, pageState],
  );
  const [searchValue, setSearchValue] = useState('');
  const goToItemDetails = useCallback(
    (item: Item) => navigation.navigate('ItemDetails', {id: item.id}),
    [navigation],
  );
  const goToQrItemMark = useCallback(
    (item: Item) => navigation.navigate('QrItemMarking', {id: item.id}),
    [navigation],
  );

  const goToCreateItem = useCallback(
    () => navigation.navigate('CreateItem'),
    [navigation],
  );

  if (!state) {
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
  if (state.status !== FULFILLED) {
    return null;
  }
  return (
    <SelectItemForQrMarkingScreen
      searchValue={searchValue}
      onChangeText={setSearchValue}
      onItemLongPress={goToItemDetails}
      onItemPress={goToQrItemMark}
      onCreatePress={goToCreateItem}
      data={state.result}
    />
  );
});
