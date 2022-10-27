import React from 'react';
import {observer} from 'mobx-react-lite';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useRoot, variance} from '../core';
import {AuthStack} from './AuthStack';
import AppNavigatorRoot from './AppNavigatorRoot';

export const NavigationRoot = observer(() => {
  const {navigationContainerTheme} = useRoot();
  return (
    <RootView>
      <AppNavigatorRoot />
      <View style={styles.layer} pointerEvents="box-none">
        <NavigationContainer theme={navigationContainerTheme.theme} independent>
          <AuthStack />
        </NavigationContainer>
      </View>
    </RootView>
  );
});

const RootView = variance(View)(theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.palette['background-basic-color-1'],
  },
}));

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFillObject,
  },
});
