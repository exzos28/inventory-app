import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';

import {
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import {observer} from 'mobx-react-lite';
import {useAnimatedStyle} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useRoot} from '../../core/Root/hooks';
import {Gutter} from '../types';
import Modal, {ModalProps, ModalRef} from './Modal';

export type ScrollViewModalProps = Omit<
  ModalProps,
  'bottomSheetSnapPoints' | 'handleHeight' | 'snapPoints'
>;

export default observer<ScrollViewModalProps, ModalRef>(
  function ScrollViewModal(props, ref) {
    const {children, ...rest} = props;
    const {windowDimensionsState} = useRoot();
    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
    const {
      animatedHandleHeight,
      animatedSnapPoints,
      animatedContentHeight,
      handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    const autoHeightProps = {
      snapPoints: animatedSnapPoints,
      handleHeight: animatedHandleHeight,
    };

    const topInset = useSafeAreaInsets().top + Gutter.Small;
    const scrollViewAnimatedStyles = useAnimatedStyle(() => {
      const contentHeight = animatedContentHeight.value;
      const handleHeight = animatedHandleHeight.value;
      const bottomSheetHeight = handleHeight + contentHeight;
      const height =
        bottomSheetHeight > windowDimensionsState.window.height
          ? windowDimensionsState.window.height - handleHeight - topInset
          : bottomSheetHeight;
      return {
        height: height,
      };
    });
    return (
      <Modal ref={ref} topInset={topInset} {...autoHeightProps} {...rest}>
        <BottomSheetScrollView
          style={scrollViewAnimatedStyles}
          contentContainerStyle={styles.container}>
          <View style={styles.content} onLayout={handleContentLayout}>
            {children}
          </View>
        </BottomSheetScrollView>
      </Modal>
    );
  },
  {forwardRef: true},
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingTop: Gutter.Large,
  },
});
