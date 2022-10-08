import React from 'react';
import {observer} from 'mobx-react-lite';
import {useStrings, variance} from '../../core';
import {Button, Text} from '@ui-kitten/components';
import {
  EXTRA_BOTTOM_OFFSET,
  SafeAreaInset,
  SafeAreaLayout,
} from '../../components';
import {View} from 'react-native';

export type OnboardingScreenProps = {
  onNextPress: () => void;
};

export default observer(function OnboardingScreen(
  props: OnboardingScreenProps,
) {
  const {onNextPress} = props;
  const strings = useStrings();
  return (
    <Root insets={SafeAreaInset.BOTTOM} extra={{bottom: EXTRA_BOTTOM_OFFSET}}>
      <Content>
        <Title category="h1">Welcome</Title>
      </Content>
      <LetsGoButton onPress={onNextPress} size="large">
        {strings['onboarding.button']}
      </LetsGoButton>
    </Root>
  );
});

const Root = variance(SafeAreaLayout)(theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.palette['background-basic-color-1'],
    padding: 20,
    justifyContent: 'center',
  },
}));

const Title = variance(Text)(() => ({
  root: {
    marginBottom: 20,
  },
}));

const Content = variance(View)(() => ({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
}));

const LetsGoButton = variance(Button)(() => ({
  root: {
    marginTop: 30,
  },
}));
