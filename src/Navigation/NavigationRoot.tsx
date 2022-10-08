import React from 'react';
import {observer} from 'mobx-react-lite';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useRoot, variance} from '../core';
import {RootStack} from './RootStack';

export const NavigationRoot = observer(() => {
  const {
    navigationContainerBinding,
    linkingOptionsProvider,
    navigationContainerTheme,
  } = useRoot();
  return (
    <Root>
      <NavigationContainer
        theme={navigationContainerTheme.theme}
        linking={linkingOptionsProvider.linkingOptions}
        {...navigationContainerBinding.props}>
        <RootStack />
      </NavigationContainer>
    </Root>
  );
});
const Root = variance(View)(theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.palette['background-basic-color-1'],
  },
}));
