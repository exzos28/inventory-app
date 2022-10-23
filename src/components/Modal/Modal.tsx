import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import {observable, reaction, runInAction, when} from 'mobx';
import {observer} from 'mobx-react-lite';

import BottomSheet, {
  BottomSheetRef,
  BottomSheetProps as GorhomBottomSheetProps,
} from './BottomSheet';
import {createNullableContext} from '../../core/context';

export type ModalRef = {
  close: () => Promise<void>;
};

export type ModalProps = GorhomBottomSheetProps & {
  children: React.ReactNode;
  /**
   * Called when the modal window is closed in any of the ways - via ref or via interaction with the background / gestures
   */
  onModalClose?: () => void;
  /**
   * !!! Will not be called if the modal is closed with ref
   */
  onModalClosed?: () => void;
  defaultVisible?: boolean;
};

export default observer<ModalProps, ModalRef>(
  function Modal(props, ref) {
    const {
      children,
      onModalClose,
      onModalClosed,
      onChange,
      enablePanDownToClose = true,
      ...rest
    } = props;

    const [visibleBox] = useState(() => observable.box(false));
    const visibleGhostRef = useRef(false); // Helper to avoid calling onModalClosed when closing a modal with a ref
    const getVisible = useCallback(() => visibleBox.get(), [visibleBox]);

    const bottomSheetRef = useRef<BottomSheetRef>(null);

    useEffect(
      () =>
        reaction(
          () => getVisible(),
          _visible => {
            if (!_visible) {
              if (!visibleGhostRef.current) {
                onModalClosed?.();
              }
              onModalClose?.();
            }
          },
        ),
      [getVisible, onModalClose, onModalClosed],
    );

    const _onChange = useCallback(
      (index: number) => {
        onChange?.(index);
        if (index === -1) {
          runInAction(() => visibleBox.set(false));
        } else if (index === 0) {
          runInAction(() => visibleBox.set(true));
        }
      },
      [onChange, visibleBox],
    );

    useImperativeHandle(ref, () => ({
      close: async () => {
        bottomSheetRef.current?.close();
        visibleGhostRef.current = true;
        await when(() => !visibleBox.get());
      },
    }));

    const renderBottomSheet = () => (
      <BottomSheet
        onChange={_onChange}
        ref={bottomSheetRef}
        index={0}
        enablePanDownToClose={enablePanDownToClose}
        {...rest}>
        {children}
      </BottomSheet>
    );
    return (
      <ModalContext.Provider value={props}>
        {renderBottomSheet()}
      </ModalContext.Provider>
    );
  },
  {forwardRef: true},
);

export const ModalContext = createNullableContext<ModalProps>();
