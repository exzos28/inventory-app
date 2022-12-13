import React, {useCallback, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from '../RootStackBindingProps';
import {ConfirmItemsTransferScreen} from '../../../screens/ConfirmItemsTransferScreen';
import {Alert} from 'react-native';
import {PENDING, REJECTED, useRoot, useStrings} from '../../../core';
import useNavigationGetIsFocused from '../../hooks/useNavigationGetIsFocused';
import {autorun} from 'mobx';
import {ErrorScreen} from '../../../screens/ErrorScreen';
import {Item} from '../../../core/ItemHelper';
import {noop} from 'lodash';
import ConfirmItemsTransferState from '../ConfirmItemsTransferState';
import useGoToUnknownError from '../useGoToUnknownError';

export default observer(function ConfirmItemsTransferBinding({
  navigation,
  route,
}: RootStackBindingProps<'ConfirmItemsTransfer'>) {
  const root = useRoot();
  const strings = useStrings();
  const [pageState] = useState(() => new ConfirmItemsTransferState(root));

  const {items, forUser} = route.params;
  const getIsFocused = useNavigationGetIsFocused();
  useEffect(
    () => autorun(() => getIsFocused() && pageState.fetch(items, forUser)),
    [forUser, getIsFocused, items, pageState],
  );

  const goToUnknownError = useGoToUnknownError(navigation);
  const goToDetails = useCallback(
    (item: Item) => navigation.navigate('ItemDetails', {id: item.id}),
    [navigation],
  );

  const onSubmit = useCallback(async () => {
    const response_ = await pageState.accept();
    if (!response_.success) {
      return goToUnknownError(response_.left);
    }
    Alert.alert(
      strings['confirmItemsTransferScreen.successAlert.title'],
      strings['confirmItemsTransferScreen.successAlert.description'],
    );
    navigation.popToTop();
  }, [goToUnknownError, navigation, pageState, strings]);

  if (pageState.state === undefined || pageState.state.status === PENDING) {
    return null;
  }
  if (pageState.state.status === REJECTED) {
    return (
      <ErrorScreen
        raw={pageState.state.error}
        onReturnPress={navigation.goBack}
        description={pageState.state.error.description}
      />
    );
  }

  return (
    <ConfirmItemsTransferScreen
      onItemPress={goToDetails}
      data={pageState.state.result.items}
      user={pageState.state.result.user}
      onSubmitPress={onSubmit}
      onCreatePress={noop}
    />
  );
});
