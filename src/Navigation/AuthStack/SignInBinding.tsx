import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {AuthStackBindingProps} from './AuthStackBindingProps';
import {SignInScreen} from '../../screens/SignInScreen';

export type SignInBindingProps = AuthStackBindingProps<'SignIn'>;

export default observer(function SignInBinding(props: SignInBindingProps) {
  const {navigation} = props;
  const goToSignUp = useCallback(
    () => navigation.navigate('SignUp'),
    [navigation],
  );
  return <SignInScreen onSignUpPress={goToSignUp} />;
});
