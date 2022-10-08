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

export type SignUpScreenProps = {
  onSignInPress: () => void;
  // TODO pass data
  onSignUp: () => void;
};

export default observer(function SignUpScreen({
  onSignInPress,
  onSignUp,
}: SignUpScreenProps) {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const styles = useStyleSheet(themedStyles);

  const onPasswordIconPress = useCallback(() => {
    setPasswordVisible(!passwordVisible);
  }, [passwordVisible]);

  const onSignUpPress = useCallback(() => {
    onSignUp();
  }, [onSignUp]);

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
        <View style={styles.headerView}>
          <Text category="s1" status="control">
            Registering a new account
          </Text>
        </View>
        <Layout style={styles.formView} level="1">
          <Input
            placeholder="First Name Last Name"
            accessoryRight={PersonIcon}
            value={username}
            onChangeText={setUsername}
          />
          <Input
            style={styles.offsetInput}
            placeholder="Email"
            accessoryRight={EmailIcon}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.offsetInput}
            placeholder="Password"
            accessoryRight={renderPasswordIcon}
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
          />
          <Input
            style={styles.offsetInput}
            placeholder="Repeat password"
            accessoryRight={renderPasswordIcon}
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
          />
        </Layout>
        <Button
          onPress={onSignUpPress}
          style={styles.signUpButton}
          size="giant">
          Sign up
        </Button>
        <Button
          style={styles.signInButton}
          appearance="ghost"
          status="basic"
          onPress={onSignInPress}>
          Already have an account? Sign in
        </Button>
      </ScrollView>
    </CustomKeyboardAvoidingView>
  );
});

const PersonIcon = (props: IconProps) => <Icon {...props} name="person" />;

const EmailIcon = (props: IconProps) => <Icon {...props} name="email" />;

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
    minHeight: 100,
    backgroundColor: 'color-primary-default',
  },
  formView: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  signUpButton: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  offsetInput: {
    marginTop: 16,
  },
});
