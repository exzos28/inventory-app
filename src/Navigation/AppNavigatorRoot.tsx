import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';

import {useRoot} from '../core/Root/hooks';
import {RootStack} from './RootStack';

export default observer(function AppNavigatorRoot() {
  const {navigationContainerBinding, navigationContainerTheme} = useRoot();
  return (
    <NavigationContainer
      theme={navigationContainerTheme.theme}
      {...navigationContainerBinding.props}>
      <RootStack />
    </NavigationContainer>
  );
});
