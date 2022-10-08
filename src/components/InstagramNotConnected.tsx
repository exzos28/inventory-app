import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {View} from 'react-native';
import {
  Button,
  ButtonProps,
  Icon,
  IconProps,
  Text,
} from '@ui-kitten/components';
import {useStrings, useStyles, variance} from '../core';
import {observable, runInAction} from 'mobx';

export type InstagramNotConnectedProps = {
  goToConnectInstagram: () => void;
};

export default observer(function InstagramNotConnected({
  goToConnectInstagram,
}: InstagramNotConnectedProps) {
  const strings = useStrings();
  return (
    <View>
      <ConnectedTitle>
        <Text category="h6">
          {strings['common.instagram.notConnectedTitle']}
        </Text>
      </ConnectedTitle>
      <ConnectInstagramButton onPress={goToConnectInstagram} />
    </View>
  );
});

const ConnectInstagramButton = observer((props: ButtonProps) => {
  const strings = useStrings();
  const [isPressedButton] = useState(() => observable.box(false));
  const styles = useStyles(theme => ({
    root: {
      backgroundColor: '#FF708D',
      borderColor: '#FF708D',
    },
    pressed: {
      backgroundColor: theme.chroma('#FF708D').darken(0.3).hex(),
      borderColor: theme.chroma('#FF708D').darken(0.3).hex(),
    },
  }));
  return (
    <Button
      size="large"
      style={[styles.root, isPressedButton.get() && styles.pressed]}
      accessoryLeft={InstagramIcon}
      onPressOut={() => runInAction(() => isPressedButton.set(false))}
      onPressIn={() => runInAction(() => isPressedButton.set(true))}
      {...props}>
      {strings['common.instagram.connectButton']}
    </Button>
  );
});
const InstagramIcon = (props: IconProps) => (
  <Icon {...props} name="instagram" pack="assets" />
);

const ConnectedTitle = variance(View)(() => ({
  root: {
    marginBottom: 15,
  },
}));
