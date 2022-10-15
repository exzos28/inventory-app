import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {SignInScreen} from '../../screens/SignInScreen';
import {RootStackBindingProps} from '../RootStack/RootStackBindingProps';

export default observer(function SignInBinding(
  props: RootStackBindingProps<'Auth'>,
) {
  const {navigation} = props;
  const goToSignUp = useCallback(
    () => navigation.navigate('SignUp'),
    [navigation],
  );
  return <SignInScreen onSignUpPress={goToSignUp} />;
});
