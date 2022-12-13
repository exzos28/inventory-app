import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, Icon, IconProps, Layout} from '@ui-kitten/components';
import {observer} from 'mobx-react-lite';
import {ScrollView} from 'react-native-gesture-handler';
import useOnLogInPress, {OAuthVariant} from './useOnLogInPress';
import {useStrings, variance} from '../../core';
import {AlignItems, Bubble, Gutter, Space} from '../../components';
import Leveler from '../../components/Leveler';

export type SignInScreenProps = {};

export default observer(function SignInScreen({}: SignInScreenProps) {
  const onPress = useOnLogInPress();
  const strings = useStrings();
  return (
    <RootLayout>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}>
        <HeaderView>
          <Bubble>
            <Leveler align={AlignItems.Center}>
              <Text category="h1" status="control">
                {strings['signInScreen.welcome']}
              </Text>
            </Leveler>
          </Bubble>
        </HeaderView>

        <ContentBubble>
          <Space>
            <SignInHelperText appearance="hint" category="c2">
              {strings['signInScreen.socialTitle']}
            </SignInHelperText>
            <Space gutter={Gutter.Middle}>
              <Button
                status="info"
                size="large"
                onPress={() => onPress(OAuthVariant.Google)}
                accessoryLeft={GoogleIcon}>
                Google
              </Button>

              <Button
                disabled
                size="large"
                onPress={() => onPress(OAuthVariant.Google)}
                accessoryLeft={FacebookIcon}>
                Facebook
              </Button>

              <Button
                disabled
                status="basic"
                size="large"
                onPress={() => onPress(OAuthVariant.Apple)}
                accessoryLeft={AppleIcon}>
                Apple
              </Button>
            </Space>
          </Space>
        </ContentBubble>
      </ScrollView>
    </RootLayout>
  );
});

const FacebookIcon = (props: IconProps) => <Icon {...props} name="facebook" />;
const AppleIcon = (props: IconProps) => (
  <Icon {...props} name="apple" pack="assets" />
);
const GoogleIcon = (props: IconProps) => <Icon {...props} name="google" />;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

const RootLayout = variance(Layout)(() => ({
  root: {
    flex: 1,
  },
}));

const HeaderView = variance(Layout)(theme => ({
  root: {
    backgroundColor: theme.palette['color-primary-400'],
  },
}));

const ContentBubble = variance(Bubble)(() => ({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
}));

const SignInHelperText = variance(Text)(theme => ({
  root: {
    fontSize: 20,
    textAlign: 'center',
    color: theme.palette['text-basic-color'],
  },
}));
