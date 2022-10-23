import React, {useCallback, useState} from 'react';

import {observer} from 'mobx-react-lite';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Gutter, Space} from '../../components';
import {AutoHeightModal, ModalProps, ModalRef} from '../../components/Modal';
import variance from '../../core/styling/hoc/variance';
import {Button, Input} from '@ui-kitten/components';
import {KEYBOARD_INPUT_MODE} from '@gorhom/bottom-sheet';
import {useBottomSheetInternal} from '@gorhom/bottom-sheet/src/hooks';
import {useStrings} from '../../core';

export type PickFieldNameModalProps = Partial<ModalProps> & {
  onSubmit: (_: string) => void;
};

export default observer<PickFieldNameModalProps, ModalRef>(
  function PickFieldNameModal({onSubmit, ...rest}, ref) {
    return (
      <AutoHeightModal
        android_keyboardInputMode={KEYBOARD_INPUT_MODE.adjustResize}
        keyboardBlurBehavior="restore"
        ref={ref}
        {...rest}>
        <BottomSheetContent onSubmit={onSubmit} />
      </AutoHeightModal>
    );
  },
  {forwardRef: true},
);

export type BottomSheetContentProps = {
  onSubmit: (_: string) => void;
};

const BottomSheetContent = observer(({onSubmit}: BottomSheetContentProps) => {
  const strings = useStrings();
  const [value, setValue] = useState('');
  const {shouldHandleKeyboardEvents} = useBottomSheetInternal();
  const onFocus = useCallback(() => {
    shouldHandleKeyboardEvents.value = true;
  }, [shouldHandleKeyboardEvents]);
  const onBlur = useCallback(() => {
    shouldHandleKeyboardEvents.value = false;
  }, [shouldHandleKeyboardEvents]);
  const handleSubmit = useCallback(() => {
    onSubmit(value);
  }, [onSubmit, value]);
  return (
    <RootView edges={['bottom']}>
      <Space gutter={Gutter.Large}>
        <Space>
          <Input
            label={strings['pickFieldNameModal.label']}
            onBlur={onBlur}
            onFocus={onFocus}
            onChangeText={setValue}
          />
          <Button onPress={handleSubmit}>{strings['actions.save']}</Button>
        </Space>
      </Space>
    </RootView>
  );
});

const RootView = variance(SafeAreaView)(() => ({
  root: {
    padding: 16,
  },
}));
