import {observer} from 'mobx-react-lite';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useCallback} from 'react';
import {useStrings} from '../../core';
import {RootStackBindingProps} from '../RootStack/RootStackBindingProps';
import OnboardingBinding from './OnboardingBinding';
import {AuthHeader} from '../../components/AuthHeader';
import SignInBinding from './SignInBinding';
import SignUpBinding from './SignUpBinding';

export type AuthParamList = {
  SignIn: undefined;
  Onboarding: undefined;
  SignUp: undefined;
};

const {Navigator, Screen} = createStackNavigator<AuthParamList>();

export type AuthStackProps = RootStackBindingProps<'Auth'>;

export default observer(function AuthStack({navigation}: AuthStackProps) {
  const strings = useStrings();
  const goToChangeLanguage = useCallback(() => {
    navigation.navigate('ChangeLanguage');
  }, [navigation]);
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
      {/*<Screen name="Onboarding" component={OnboardingBinding} />*/}
      <Screen name="SignIn" component={SignInBinding} />
      <Screen name="SignUp" component={SignUpBinding} />
    </Navigator>
  );
});
