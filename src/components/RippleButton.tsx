import React from 'react';

import {observer} from 'mobx-react-lite';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';

import {useTheme} from '../core/styling';

export type RippleButtonProps = RectButtonProps;

export default observer(function RippleButton(props: RippleButtonProps) {
  const theme = useTheme();
  const underlayColor = theme.palette['color-primary-400'];
  const rippleColor = theme.chroma(underlayColor).alpha(0.1).hex();
  return (
    <RectButton
      rippleColor={rippleColor}
      underlayColor={underlayColor}
      {...props}
    />
  );
});
