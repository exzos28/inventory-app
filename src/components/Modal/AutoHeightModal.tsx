import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';

import {useBottomSheetDynamicSnapPoints} from '@gorhom/bottom-sheet';
import {observer} from 'mobx-react-lite';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import AdaptiveModal, {ModalProps, ModalRef} from './Modal';

export type AutoHeightModal = Omit<
  ModalProps,
  'bottomSheetSnapPoints' | 'handleHeight' | 'snapPoints'
>;

export default observer<AutoHeightModal, ModalRef>(
  function AutoHeightModal(props, ref) {
    const {children, ...rest} = props;
    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
    const {
      animatedHandleHeight,
      animatedSnapPoints,
      animatedContentHeight,
      handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);
    const topInset = useSafeAreaInsets().top;
    return (
      <AdaptiveModal
        ref={ref}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        topInset={topInset}
        {...rest}>
        <View style={styles.root} onLayout={handleContentLayout}>
          {children}
        </View>
      </AdaptiveModal>
    );
  },
  {forwardRef: true},
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
