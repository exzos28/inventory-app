import {Button, ButtonProps, Icon, IconProps} from '@ui-kitten/components';
import {useStrings, useStyles} from '../core';
import React from 'react';
import {observer} from 'mobx-react-lite';

export default observer(function SignInInstagramButton(props: ButtonProps) {
  const strings = useStrings();
  const styles = useStyles(() => ({
    root: {
      borderRadius: 10,
      backgroundColor: '#FF708D',
      borderColor: '#FF708D',
    },
  }));
  return (
    <Button
      size="large"
      style={styles.root}
      accessoryLeft={InstagramIcon}
      {...props}>
      {strings['button.signIn']}
    </Button>
  );
});

const InstagramIcon = (props: IconProps) => (
  <Icon {...props} name="instagram" pack="assets" />
);
