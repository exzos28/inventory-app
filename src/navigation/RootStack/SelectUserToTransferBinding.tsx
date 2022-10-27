import React, {useCallback, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {SelectUserToTransferScreen} from '../../screens/SelectUserToTransferScreen';
import {UserType} from '../../tempTypes';
import {USERS} from '../../MOCK';

export default observer(function SelectUserToTransferBinding({
  navigation,
}: RootStackBindingProps<'SelectUserToTransfer'>) {
  const [searchValue, setSearchValue] = useState('');
  const onUserSelect = useCallback(
    (user: UserType) =>
      navigation.navigate('ItemsSelectionForUser', {forUser: user.id}),
    [navigation],
  );
  return (
    <SelectUserToTransferScreen
      data={USERS}
      searchValue={searchValue}
      onChangeText={setSearchValue}
      onItemPress={onUserSelect}
    />
  );
});
