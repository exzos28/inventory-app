import React from 'react';
import {observer} from 'mobx-react-lite';
import {Layout} from '@ui-kitten/components';
import {variance} from '../../core';
import {UserList, UserListProps} from '../../components/modules/UserList';

type FindUserScreenProps = UserListProps & {};

export default observer(function FindUserScreen({
  searchValue,
  onChangeText,
  data,
}: FindUserScreenProps) {
  return (
    <RootLayout>
      <UserList
        searchValue={searchValue}
        onChangeText={onChangeText}
        data={data}
      />
    </RootLayout>
  );
});
const RootLayout = variance(Layout)(() => ({
  root: {
    flex: 1,
  },
}));
