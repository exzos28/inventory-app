import {observer} from 'mobx-react-lite';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useCallback} from 'react';
import {useStrings} from '../../core';
import {AuthHeader} from '../../components/AuthHeader';
import SignInBinding from './SignInBinding';

export type AuthParamList = {
  SignIn: undefined;
};

const {Navigator, Screen} = createStackNavigator<AuthParamList>();

export default observer(function AuthStack() {
  const strings = useStrings();
  const goToChangeLanguage = useCallback(() => {
    // navigation.navigate('ChangeLanguage');
  }, []);
  return (
    <Navigator
      initialRouteName="SignIn"
      screenOptions={{
        cardShadowEnabled: true,
        title: strings['authorization.title'],
        header: props => (
          <AuthHeader {...props} onLanguagePress={goToChangeLanguage} />
        ),
        headerMode: 'float',
      }}>
      <Screen name="SignIn" component={SignInBinding} />
    </Navigator>
  );
});
