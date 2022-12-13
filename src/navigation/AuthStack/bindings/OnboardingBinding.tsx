import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {OnboardingScreen} from '../../../screens/OnboardingScreen';
import {AuthStackBindingProps} from '../AuthStackBindingProps';

export type OnboardingBindingProps = AuthStackBindingProps<'Onboarding'>;

export default observer(function OnboardingBinding(
  props: OnboardingBindingProps,
) {
  const {navigation} = props;
  const onNextPress = useCallback(
    () => navigation.replace('SignIn'),
    [navigation],
  );
  return <OnboardingScreen onNextPress={onNextPress} />;
});
