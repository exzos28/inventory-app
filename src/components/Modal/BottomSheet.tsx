import React, {useImperativeHandle, useRef} from 'react';
import {
  Pressable,
  StyleSheet,
  TouchableWithoutFeedbackProps,
  View,
} from 'react-native';

import GBottomSheet, {
  BottomSheetBackdropProps as GBottomSheetBackdropProps,
  BottomSheetHandleProps as GBottomSheetHandleProps,
  BottomSheetProps as GBottomSheetProps,
} from '@gorhom/bottom-sheet';
import {observer} from 'mobx-react-lite';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {useStyles} from '../../core/styling';

export type BottomSheetRef = {
  open: () => void;
  close: () => void;
};
export type BottomSheetBackdropProps = GBottomSheetBackdropProps;
export type BottomSheetHandleProps = GBottomSheetHandleProps;
export type BottomSheetProps = GBottomSheetProps;

// TODO Bug with closed index
export default observer<BottomSheetProps, BottomSheetRef>(
  function Modalize(props, ref) {
    const {children, ...rest} = props;
    const styles = useStyles(theme => ({
      background: {
        backgroundColor: theme.palette['background-basic-color-3'],
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
    }));
    const modalRef = useRef<GBottomSheet>(null);
    const open = () => modalRef.current?.collapse();
    const close = () => modalRef.current?.close();
    useImperativeHandle(ref, () => ({
      open,
      close,
    }));
    const renderBackdropComponent = (
      backdropProps: BottomSheetBackdropProps,
    ) => <Backdrop {...backdropProps} onPress={close} />;
    return (
      <GBottomSheet
        ref={modalRef}
        backgroundStyle={styles.background}
        backdropComponent={renderBackdropComponent}
        handleComponent={renderHandle}
        {...rest}>
        {children}
      </GBottomSheet>
    );
  },
  {forwardRef: true},
);

type BackdropProps = TouchableWithoutFeedbackProps & BottomSheetBackdropProps;

const Backdrop = observer(({style, animatedIndex, ...rest}: BackdropProps) => {
  const styles = useStyles(theme => ({
    root: {
      backgroundColor: theme
        .chroma(theme.palette['background-alternative-color-1'])
        .alpha(0.4)
        .hex(),
    },
    back: {
      flex: 1,
    },
  }));
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolate.CLAMP,
    ),
  }));
  return (
    <Animated.View style={[style, styles.root, containerAnimatedStyle]}>
      <Pressable {...rest} style={styles.back} />
    </Animated.View>
  );
});

const renderHandle: BottomSheetProps['handleComponent'] = props => (
  <View style={styles.handle}>
    <Handle {...props} />
  </View>
);
const styles = StyleSheet.create({
  handle: {},
});

const Handle = observer((props: BottomSheetHandleProps) => {
  const _styles = useStyles(theme => ({
    root: {
      height: 22,
      justifyContent: 'center',
      alignItems: 'center',
    },
    handle: {
      borderRadius: 6,
      width: 67,
      height: 5,
      backgroundColor: theme.palette['color-basic-transparent-600'],
    },
  }));
  return (
    <View {...props} style={[_styles.root]}>
      <View style={_styles.handle} />
    </View>
  );
});
