import React, {useCallback, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import FindUserScreen from '../../../screens/FindUserScreen/FindUserScreen';
import {PENDING, REJECTED, useRoot, useStrings} from '../../../core';
import useNavigationGetIsFocused from '../../hooks/useNavigationGetIsFocused';
import {autorun} from 'mobx';
import {FindUserStateImpl} from '../../../core/FindUserState';
import {ErrorScreen} from '../../../screens/ErrorScreen';
import {RootStackBindingProps} from '../RootStackBindingProps';
import {Alert} from 'react-native';
import {User} from '../../../core/ProjectUsersHelper';

export default observer(function FindUserBinding({
  navigation,
}: RootStackBindingProps<'FindUser'>) {
  const root = useRoot();
  const strings = useStrings();
  const {projectUsersHelper, accountStore, projectStore} = root;
  const [pageState] = useState(() => new FindUserStateImpl(root));
  const [searchValue, setSearchValue] = useState('');
  const {state} = pageState;
  const getIsFocused = useNavigationGetIsFocused();
  useEffect(
    () => autorun(() => getIsFocused() && pageState.fetch()),
    [getIsFocused, pageState],
  );
  const deleteUser = useCallback(
    async (user: User) => {
      await projectUsersHelper.deleteUser({id: user.id});
      await pageState.fetch();
    },
    [pageState, projectUsersHelper],
  );
  const promptDeleteUser = useCallback(
    async (user: User) => {
      return Alert.alert(
        strings['common.warning'],
        strings['findUserScreen.deleteAlert.description'],
        [
          {
            text: strings['common.yes'],
            onPress: () => deleteUser(user),
            style: 'default',
          },
          {
            text: strings['common.cancel'],
            style: 'cancel',
          },
        ],
      );
    },
    [deleteUser, strings],
  );
  if (
    state === undefined ||
    state.status === PENDING ||
    accountStore.state === undefined ||
    accountStore.state.status === PENDING ||
    projectStore.state === undefined ||
    projectStore.selectedProject === undefined ||
    projectStore.state.status === PENDING
  ) {
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
  if (accountStore.state.status === REJECTED) {
    return (
      <ErrorScreen
        raw={accountStore.state.error}
        onReturnPress={navigation.goBack}
        description={accountStore.state.error.description}
      />
    );
  }
  if (projectStore.state.status === REJECTED) {
    return (
      <ErrorScreen
        raw={projectStore.state.error}
        onReturnPress={navigation.goBack}
        description={projectStore.state.error.description}
      />
    );
  }
  const currentUserId = accountStore.state.result.id;
  return (
    <FindUserScreen
      data={state.result}
      searchValue={searchValue}
      onChangeText={setSearchValue}
      onDeleteUserPress={promptDeleteUser}
      currentUserId={currentUserId}
      currentRole={projectStore.selectedProject.role}
    />
  );
});
