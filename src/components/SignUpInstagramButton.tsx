import {Button, ButtonProps, Icon, IconProps} from '@ui-kitten/components';
import {useStrings, useStyles} from '../core';
import React from 'react';
import {observer} from 'mobx-react-lite';

export default observer(function SignUpInstagramButton(props: ButtonProps) {
  const strings = useStrings();
  const styles = useStyles(() => ({
    root: {
      borderRadius: 10,
    },
  }));
  return (
    <Button
      status="basic"
      style={styles.root}
      accessoryLeft={Instagram2Icon}
      {...props}>
      {strings['button.signUp']}
    </Button>
  );
});

const Instagram2Icon = (props: IconProps) => (
  <Icon {...props} name="instagram2" pack="assets" />
);
