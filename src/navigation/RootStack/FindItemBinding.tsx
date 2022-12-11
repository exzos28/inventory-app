import React, {useCallback, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {FindItemScreen} from '../../screens/FindItemScreen';
import {RootStackBindingProps} from './RootStackBindingProps';
import {PENDING, REJECTED, useRoot} from '../../core';
import {FindItemStateImpl} from '../../core/FindItemState';
import {ErrorScreen} from '../../screens/ErrorScreen';
import {Item} from '../../core/ItemHelper';
import useNavigationGetIsFocused from '../useNavigationGetIsFocused';
import {autorun} from 'mobx';

export default observer(function FindItemBinding({
  navigation,
}: RootStackBindingProps<'FindItem'>) {
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
  const goToCreateItem = useCallback(
    () => navigation.navigate('CreateItem'),
    [navigation],
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
    <FindItemScreen
      searchValue={searchValue}
      onChangeText={setSearchValue}
      onItemPress={goToItemDetails}
      data={state.result}
      onCreatePress={goToCreateItem}
    />
  );
});
