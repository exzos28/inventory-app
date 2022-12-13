import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from '../../RootStackBindingProps';
import {action, autorun, observable} from 'mobx';
import {ItemId} from '../../../../core/HadesServer';
import {Item} from '../../../../core/ItemHelper';
import useNavigationGetIsFocused from '../../../hooks/useNavigationGetIsFocused';
import {PENDING, REJECTED, useRoot} from '../../../../core';
import {ErrorScreen} from '../../../../screens/ErrorScreen';
import StocktakingStateImpl from './StocktakingStateImpl';
import {StocktakingScreen} from '../../../../screens/StocktakingScreen';
import usePromisifyNavigation from '../../usePromisifyNavigation';

export type StocktakingBindingProps = RootStackBindingProps<'Stocktaking'>;

export default observer(function StocktakingBinding({
  navigation,
  route,
}: StocktakingBindingProps) {
  const {userId} = route.params;
  const root = useRoot();
  const [pageState] = useState(() => new StocktakingStateImpl(root));
  const [searchValue, setSearchValue] = useState('');
  const [selectedItemsSet] = useState(() => observable.set<ItemId>([]));
  const getSelectedIds = useCallback(
    () => [...selectedItemsSet.values()],
    [selectedItemsSet],
  );

  const {state} = pageState;
  const getIsFocused = useNavigationGetIsFocused();
  useEffect(
    () => autorun(() => getIsFocused() && pageState.fetch(userId!)),
    [getIsFocused, pageState, userId],
  );

  const {promisifyNavigate} = usePromisifyNavigation<
    StocktakingBindingProps['route']
  >(() => navigation.navigate('ScanQRForStocktaking'));

  const goToItemDetails = useCallback(
    (item: Item) => navigation.navigate('ItemDetails', {id: item.id}),
    [navigation],
  );
  const onItemPress = useMemo(
    () =>
      action(({id}: Item) => {
        const exists = selectedItemsSet.has(id);
        if (exists) {
          selectedItemsSet.delete(id);
        }
      }),
    [selectedItemsSet],
  );
  const scan = useCallback(async () => {
    const response = await promisifyNavigate();
    if (response.success) {
      const scannedValue = response.right?.scannedValue;
      if (
        scannedValue !== undefined &&
        !selectedItemsSet.has(scannedValue.itemId)
      ) {
        selectedItemsSet.add(scannedValue.itemId);
      }
    }
  }, [promisifyNavigate, selectedItemsSet]);
  const next = useCallback(
    () =>
      userId !== undefined &&
      navigation.navigate('StocktakingResult', {
        userId: userId,
        items: getSelectedIds(),
      }),
    [getSelectedIds, navigation, userId],
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
    <StocktakingScreen
      data={state.result}
      searchValue={searchValue}
      onChangeText={setSearchValue}
      onItemPress={onItemPress}
      onItemLongPress={goToItemDetails}
      getSelectedIds={getSelectedIds}
      onScanPress={scan}
      onNextPress={next}
    />
  );
});
