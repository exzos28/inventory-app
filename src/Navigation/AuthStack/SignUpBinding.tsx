import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {AuthStackBindingProps} from './AuthStackBindingProps';
import {SignUpScreen} from '../../screens/SignUpScreen';

export type SignInBindingProps = AuthStackBindingProps<'SignIn'>;

export default observer(function SignUpBinding(props: SignInBindingProps) {
  const {navigation} = props;
  const goToSignIn = useCallback(
    () => navigation.navigate('SignIn'),
    [navigation],
  );
  const goToApp = useCallback(() => {
    navigation.replace('Menu');
  }, [navigation]);
  return <SignUpScreen onSignUp={goToApp} onSignInPress={goToSignIn} />;
});
