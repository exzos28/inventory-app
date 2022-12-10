import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';

import {useRoot} from '../core/Root/hooks';
import {RootStack} from './RootStack';
import {FULFILLED} from '../core';

export default observer(function AppNavigatorRoot() {
  const {navigationContainerBinding, navigationContainerTheme, authState} =
    useRoot();
  return (
    <NavigationContainer
      theme={navigationContainerTheme.theme}
      {...navigationContainerBinding.props}>
      {authState.latest?.status === FULFILLED && <RootStack />}
    </NavigationContainer>
  );
});
