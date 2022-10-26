import {observer} from 'mobx-react-lite';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useStrings} from '../../core';
import {AuthHeader} from '../../components/AuthHeader';
import SignInBinding from './SignInBinding';

export type AuthParamList = {
  SignIn: undefined;
};

const {Navigator, Screen} = createStackNavigator<AuthParamList>();

export default observer(function AuthStack() {
  const strings = useStrings();
  return (
    <Navigator
      initialRouteName="SignIn"
      screenOptions={{
        cardShadowEnabled: true,
        title: strings['authorization.title'],
        header: props => <AuthHeader {...props} />,
        headerMode: 'float',
      }}>
      <Screen name="SignIn" component={SignInBinding} />
    </Navigator>
  );
});
