import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {MenuScreen} from '../../screens/MenuScreen';
import {NotFoundProjectScreen} from '../../screens/NotFoundProjectScreen';
import {PENDING, REJECTED, useRoot} from '../../core';
import {ErrorScreen} from '../../screens/ErrorScreen';
import {noop} from 'lodash';

export default observer(function MenuScreenBinding({
  navigation,
}: RootStackBindingProps<'Menu'>) {
  const {projectStore} = useRoot();

  const onScanPress = useCallback(
    () => navigation.navigate('ScanQR'),
    [navigation],
  );
  const goToFindUser = useCallback(
    () => navigation.navigate('FindUser'),
    [navigation],
  );
  const goToFindItem = useCallback(
    () => navigation.navigate('FindItem'),
    [navigation],
  );
  const goToCreateItem = useCallback(
    () => navigation.navigate('CreateItem'),
    [navigation],
  );
  const goToSelectUserToTransfer = useCallback(
    () => navigation.navigate('SelectUserToTransfer'),
    [navigation],
  );
  const goToSelectItemForQrMarking = useCallback(
    () => navigation.navigate('SelectItemForQrMarking'),
    [navigation],
  );

  const goToCreateProject = useCallback(
    () => navigation.navigate('CreateProject'),
    [navigation],
  );
  const goToInviteUserToProject = useCallback(
    () => navigation.navigate('InviteUserToProject'),
    [navigation],
  );
  const {state} = projectStore;

  if (state === undefined || state.status === PENDING) {
    return null;
  }

  if (state.status === REJECTED) {
    return (
      <ErrorScreen
        onReturnPress={noop}
        description={state.error.description}
        raw={state.error}
        visibleReturnButton={false}
      />
    );
  }

  if (state.result.length === 0) {
    return <NotFoundProjectScreen onCreateProjectPress={goToCreateProject} />;
  }
  if (projectStore.selectedProject === undefined) {
    return null;
  }

  return (
    <MenuScreen
      onFindUserPress={goToFindUser}
      onFindItemPress={goToFindItem}
      onCreateItemPress={goToCreateItem}
      onSelectUserToTransferPress={goToSelectUserToTransfer}
      onSelectItemForQrMarking={goToSelectItemForQrMarking}
      onScanPress={onScanPress}
      onInviteUserPress={goToInviteUserToProject}
    />
  );
});
