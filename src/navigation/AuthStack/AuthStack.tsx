import {observer} from 'mobx-react-lite';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {FULFILLED, PENDING, REJECTED, useRoot, useStrings} from '../../core';
import {AuthHeader} from '../../components/AuthHeader';
import SignInBinding from './bindings/SignInBinding';
import {UNAUTHORIZED} from '../../core/Auth';
import AuthorizationErrorBinding from './bindings/AuthorizationErrorBinding';

export type AuthParamList = {
  Loader: undefined;
  SignIn: undefined;
  AuthorizationError:
    | {
        raw?: unknown;
        description?: string;
      }
    | undefined;
};

const {Navigator, Screen} = createStackNavigator<AuthParamList>();

export default observer(function AuthStack() {
  const {authState} = useRoot();
  const strings = useStrings();
  let screens: React.ReactNode = null;

  if (!authState.latest || authState.latest.status === PENDING) {
    screens = null;
  } else if (authState.latest.status === FULFILLED) {
    if (authState.latest.result.kind === UNAUTHORIZED) {
      screens = (
        <>
          <Screen
            name="SignIn"
            component={SignInBinding}
            options={{
              animationEnabled: false,
            }}
          />
        </>
      );
    }
  } else if (authState.latest.status === REJECTED) {
    screens = (
      <>
        <Screen
          name="AuthorizationError"
          options={{
            title: strings['navigation.authorizationError'],
          }}
          initialParams={{
            raw: authState.latest.error,
            description: authState.latest.error.description,
          }}
          component={AuthorizationErrorBinding}
        />
      </>
    );
  }

  return (
    screens && (
      <Navigator
        initialRouteName="SignIn"
        screenOptions={{
          cardShadowEnabled: true,
          title: strings['signInScreen.title'],
          header: props => <AuthHeader {...props} />,
          headerMode: 'float',
        }}>
        {screens}
      </Navigator>
    )
  );
});

// const noHeaderOptions = {headerShown: false};
// const noTitleOptions = {headerTitle: () => null};
