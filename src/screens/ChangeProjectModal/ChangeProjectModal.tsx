import React from 'react';

import {observer} from 'mobx-react-lite';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AutoHeightModal, ModalProps, ModalRef} from '../../components/Modal';
import variance from '../../core/styling/hoc/variance';
import {Divider, List} from '@ui-kitten/components';
import {KEYBOARD_INPUT_MODE} from '@gorhom/bottom-sheet';
import {useRoot} from '../../core';
import ProjectItem, {PROJECT_ITEM_HEIGHT} from './ProjectItem';
import {PROJECTS} from '../../MOCK';
import {FlatListProps, StyleSheet, View} from 'react-native';
import {ProjectType} from '../../tempTypes';
import {expr} from 'mobx-utils';

export type ChangeProjectModalProps = Partial<ModalProps> & {};

export default observer<ChangeProjectModalProps, ModalRef>(
  function ChangeProjectModal(props, ref) {
    return (
      <AutoHeightModal
        android_keyboardInputMode={KEYBOARD_INPUT_MODE.adjustResize}
        keyboardBlurBehavior="restore"
        ref={ref}
        {...props}>
        <BottomSheetContent />
      </AutoHeightModal>
    );
  },
  {forwardRef: true},
);

export type BottomSheetContentProps = {};

const BottomSheetContent = observer(({}: BottomSheetContentProps) => {
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom;
  const {
    windowDimensionsState: {
      window: {height},
    },
  } = useRoot();
  const renderItem: ListProps['renderItem'] = ({item}) => (
    <ProjectItem onItemPress={() => {}} item={item} />
  );
  const items = PROJECTS;
  const listHeight = expr(
    () =>
      Math.min(items.length * PROJECT_ITEM_HEIGHT, height * 0.8) +
      paddingBottom,
  );
  return (
    <ListView style={{maxHeight: listHeight}}>
      <List
        style={styles.list}
        data={items}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={[styles.container, {paddingBottom}]}
      />
    </ListView>
  );
});

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'transparent',
  },
  container: {
    flexGrow: 1,
  },
});

type ListProps = FlatListProps<ProjectType>;

const keyExtractor: ListProps['keyExtractor'] = item => String(item.id);

const ListView = variance(View)(() => ({
  root: {
    flex: 1,
  },
}));
