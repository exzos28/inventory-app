import React from 'react';
import {observer} from 'mobx-react-lite';
import {Layout} from '@ui-kitten/components';
import {variance} from '../../../core';
import {UserList, UserListProps} from '../../organisms/UserList';

export type FindUserSceneProps = UserListProps & {};

export default observer(function FindUserScene(props: FindUserSceneProps) {
  return (
    <RootLayout>
      <UserList {...props} />
    </RootLayout>
  );
});

const RootLayout = variance(Layout)(() => ({
  root: {
    flex: 1,
  },
}));
