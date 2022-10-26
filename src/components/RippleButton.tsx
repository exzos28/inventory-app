import React, {useCallback, useRef} from 'react';

import {observer} from 'mobx-react-lite';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';

import {useTheme} from '../core/styling';
import {HandlerStateChangeEvent} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';

export type RippleButtonProps = RectButtonProps & {
  onLongPress?: () => void;
  longPressTimeout?: number;
};

export default observer(function RippleButton({
  onLongPress,
  longPressTimeout = 500,
  ...rest
}: RippleButtonProps) {
  const theme = useTheme();
  const underlayColor = theme.palette['color-primary-400'];
  const rippleColor = theme.chroma(underlayColor).alpha(0.1).hex();
  const timerRef = useRef<NodeJS.Timeout>();
  const handleHandlerStateChange = useCallback(
    (event: HandlerStateChangeEvent) => {
      const {state} = event.nativeEvent;
      clearTimeout(timerRef.current);
      if (state === 4) {
        timerRef.current = setTimeout(() => {
          onLongPress?.();
        }, longPressTimeout);
      }
    },
    [longPressTimeout, onLongPress],
  );
  return (
    <RectButton
      rippleColor={rippleColor}
      underlayColor={underlayColor}
      onHandlerStateChange={handleHandlerStateChange}
      {...rest}
    />
  );
});
