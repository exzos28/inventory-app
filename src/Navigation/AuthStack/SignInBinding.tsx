import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {SignInScreen} from '../../screens/SignInScreen';
import {AuthStackBindingProps} from './AuthStackBindingProps';

export default observer(
  function SignInBinding({}: AuthStackBindingProps<'SignIn'>) {
    const goToSignUp = useCallback(() => {}, []);
    return <SignInScreen onSignUpPress={goToSignUp} />;
  },
);
