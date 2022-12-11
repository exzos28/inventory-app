import React, {useCallback, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {SelectUserToTransferScreen} from '../../screens/SelectUserToTransferScreen';
import {FindUserStateImpl} from '../../core/FindUserState';
import useNavigationGetIsFocused from '../useNavigationGetIsFocused';
import {autorun} from 'mobx';
import {PENDING, REJECTED, useRoot} from '../../core';
import {ErrorScreen} from '../../screens/ErrorScreen';
import {User} from '../../core/ProjectUsersHelper';

export default observer(function SelectUserToTransferBinding({
  navigation,
}: RootStackBindingProps<'SelectUserToTransfer'>) {
  const root = useRoot();
  const [pageState] = useState(() => new FindUserStateImpl(root));
  const [searchValue, setSearchValue] = useState('');
  const {state} = pageState;
  const getIsFocused = useNavigationGetIsFocused();
  useEffect(
    () => autorun(() => getIsFocused() && pageState.fetch()),
    [getIsFocused, pageState],
  );
  const onUserSelect = useCallback(
    (user: User) =>
      navigation.navigate('SelectItemsForTransfer', {forUser: user.id}),
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
    <SelectUserToTransferScreen
      data={state.result}
      searchValue={searchValue}
      onChangeText={setSearchValue}
      onItemPress={onUserSelect}
    />
  );
});
