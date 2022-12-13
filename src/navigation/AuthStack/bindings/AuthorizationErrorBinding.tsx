import React, {useCallback} from 'react';

import {observer} from 'mobx-react-lite';

import {REJECTED} from '../../../core';
import {useRoot} from '../../../core/Root/hooks';
import {ErrorScreen} from '../../../screens/ErrorScreen';
import {AuthStackBindingProps} from '../AuthStackBindingProps';

export default observer(function AuthorizationErrorBinding({
  route,
}: AuthStackBindingProps<'AuthorizationError'>) {
  const {authState, authHelper} = useRoot();
  const {raw, description} = route.params || {};
  const onReturn = useCallback(() => authHelper.signOut(), [authHelper]);
  if (authState.latest?.status !== REJECTED) {
    console.warn('Only for rejected status');
    return null;
  }
  return (
    <ErrorScreen raw={raw} description={description} onReturnPress={onReturn} />
  );
});
