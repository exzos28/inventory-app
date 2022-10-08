import React, {useCallback, useState} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {
  Button,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
  Icon,
  IconProps,
} from '@ui-kitten/components';
import {observer} from 'mobx-react-lite';
import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView';
import {ScrollView} from 'react-native-gesture-handler';

export type SignInScreenProps = {
  onSignUpPress: () => void;
};

export default observer(function SignInScreen({
  onSignUpPress,
}: SignInScreenProps) {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const styles = useStyleSheet(themedStyles);

  const onForgotPasswordButtonPress = () => {};

  const onPasswordIconPress = useCallback(() => {
    setPasswordVisible(!passwordVisible);
  }, [passwordVisible]);

  const renderPasswordIcon = useCallback(
    (props: IconProps) => (
      <TouchableWithoutFeedback onPress={onPasswordIconPress}>
        <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
      </TouchableWithoutFeedback>
    ),
    [onPasswordIconPress, passwordVisible],
  );

  return (
    <CustomKeyboardAvoidingView style={styles.root}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}>
        <View style={styles.socialAuthContainer}>
          <View style={styles.socialAuthButtonsContainer}>
            <Button
              appearance="ghost"
              status="basic"
              size="giant"
              accessoryLeft={GoogleIcon}
            />
            <Button
              appearance="ghost"
              status="basic"
              size="giant"
              accessoryLeft={FacebookIcon}
            />
            <Button
              appearance="ghost"
              status="basic"
              size="giant"
              accessoryLeft={AppleIcon}
            />
          </View>
        </View>
      </ScrollView>
    </CustomKeyboardAvoidingView>
  );
});

const PersonIcon = (props: IconProps) => <Icon {...props} name="person" />;
const FacebookIcon = (props: IconProps) => <Icon {...props} name="facebook" />;
const AppleIcon = (props: IconProps) => (
  <Icon {...props} name="apple" pack="assets" />
);
const GoogleIcon = (props: IconProps) => <Icon {...props} name="google" />;

const themedStyles = StyleService.create({
  root: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  container: {
    flexGrow: 1,
  },
  headerView: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 150,
    backgroundColor: 'color-primary-default',
  },
  formView: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  socialAuthContainer: {
    marginTop: 32,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});
