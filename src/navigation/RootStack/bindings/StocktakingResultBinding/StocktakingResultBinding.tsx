import React, {useCallback, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from '../../RootStackBindingProps';
import {PENDING, REJECTED, useRoot} from '../../../../core';
import StocktakingResultStateImpl from './StocktakingResultStateImpl';
import useNavigationGetIsFocused from '../../../hooks/useNavigationGetIsFocused';
import {autorun} from 'mobx';
import {Item} from '../../../../core/ItemHelper';
import {ErrorScreen} from '../../../../screens/ErrorScreen';
import {StocktakingResultScreen} from '../../../../screens/StocktakingResultScreen';

export default observer(function StocktakingResultBinding({
  navigation,
  route,
}: RootStackBindingProps<'StocktakingResult'>) {
  const {items, userId} = route.params;
  const root = useRoot();
  const [pageState] = useState(() => new StocktakingResultStateImpl(root));
  const [searchValue, setSearchValue] = useState('');
  const {state} = pageState;
  const getIsFocused = useNavigationGetIsFocused();
  useEffect(
    () => autorun(() => getIsFocused() && pageState.fetch(userId, items)),
    [getIsFocused, items, pageState, userId],
  );

  const goToMenu = useCallback(() => navigation.popToTop(), [navigation]);
  const onItemPress = useCallback(
    (item: Item) => navigation.navigate('ItemDetails', {id: item.id}),
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
    <StocktakingResultScreen
      data={state.result}
      searchValue={searchValue}
      onChangeText={setSearchValue}
      onItemPress={onItemPress}
      onGoToMenuPress={goToMenu}
    />
  );
});
