import React, {useCallback} from 'react';

import {observer} from 'mobx-react-lite';

import {REJECTED} from '../../core';
import {useRoot} from '../../core/Root/hooks';
import {ErrorScreen} from '../../screens/ErrorScreen';
import {AuthStackBindingProps} from './AuthStackBindingProps';

export default observer(
  function AuthorizationErrorBinding({}: AuthStackBindingProps<'AuthorizationError'>) {
    const {authState, authHelper} = useRoot();
    const onReturn = useCallback(() => authHelper.signOut(), [authHelper]);
    if (authState.latest?.status !== REJECTED) {
      console.warn('Only for rejected status');
      return null;
    }
    return <ErrorScreen onReturnPress={onReturn} />;
  },
);
