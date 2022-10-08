import {observer} from 'mobx-react-lite';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootTabNavigator} from '../RootBottomTab';

export type AppParamList = {
  Root: undefined;
};

const {Navigator, Screen} = createStackNavigator<AppParamList>();

export default observer(function AppStack() {
  return (
    <Navigator screenOptions={{cardShadowEnabled: true}}>
      <Screen
        name="Root"
        component={RootTabNavigator}
        options={{headerShown: false}}
      />
    </Navigator>
  );
});
