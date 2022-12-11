import React from 'react';

import {observer} from 'mobx-react-lite';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AutoHeightModal, ModalProps, ModalRef} from '../../components/Modal';
import variance from '../../core/styling/hoc/variance';
import {Button, Divider, Icon, List} from '@ui-kitten/components';
import {KEYBOARD_INPUT_MODE} from '@gorhom/bottom-sheet';
import {useRoot, useStrings, useTheme} from '../../core';
import ProjectItem, {PROJECT_ITEM_HEIGHT} from './ProjectItem';
import {FlatListProps, StyleSheet, View} from 'react-native';
import {expr} from 'mobx-utils';
import {Gutter, JustifyContent} from '../../components';
import Leveler from '../../components/Leveler';
import {Project, SelectedProject} from '../../core/ProjectStore';
import {ProjectId} from '../../core/HadesServer';

export type ChangeProjectModalProps = Partial<ModalProps> & {
  projects: Project[];
  selectedProject: SelectedProject | undefined;
  onProjectItemPress: (id: ProjectId) => void;
  onCreateButtonPress: () => void;
};

export default observer<ChangeProjectModalProps, ModalRef>(
  function ChangeProjectModal(props, ref) {
    return (
      <AutoHeightModal
        android_keyboardInputMode={KEYBOARD_INPUT_MODE.adjustResize}
        keyboardBlurBehavior="restore"
        ref={ref}
        {...props}>
        <BottomSheetContent {...props} />
      </AutoHeightModal>
    );
  },
  {forwardRef: true},
);

export type BottomSheetContentProps = ChangeProjectModalProps & {};

const BottomSheetContent = observer(
  ({
    projects,
    onCreateButtonPress,
    onProjectItemPress,
    selectedProject,
  }: BottomSheetContentProps) => {
    const insets = useSafeAreaInsets();
    const strings = useStrings();
    const paddingBottom = insets.bottom;
    const {
      windowDimensionsState: {
        window: {height},
      },
    } = useRoot();
    const renderItem: ListProps['renderItem'] = ({item}) => (
      <ProjectItem
        onItemPress={() => onProjectItemPress(item.id)}
        item={item}
        rightAccessory={() =>
          item.id === selectedProject?.project.id && <RightAccessory />
        }
      />
    );
    const maxHeight = expr(() =>
      Math.min(
        projects.length * PROJECT_ITEM_HEIGHT + FOOTER_HEIGHT + paddingBottom,
        height * 0.8,
      ),
    );
    return (
      <View style={{maxHeight, paddingBottom}}>
        <List
          style={styles.list}
          data={projects}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.container}
        />
        <FooterView>
          <Button onPress={onCreateButtonPress}>
            {strings['changeProjectModal.createButton']}
          </Button>
        </FooterView>
      </View>
    );
  },
);

type ListProps = FlatListProps<Project>;

const keyExtractor: ListProps['keyExtractor'] = item => String(item.id);

const RightAccessory = observer(() => {
  const theme = useTheme();
  return (
    <RightAccessoryView>
      <Leveler justify={JustifyContent.Center}>
        <Icon
          name="checkmark-outline"
          style={styles.icon}
          fill={theme.palette['color-primary-400']}
        />
      </Leveler>
    </RightAccessoryView>
  );
});

const RightAccessoryView = variance(View)(() => ({
  root: {
    width: 50,
    alignItems: 'flex-end',
  },
}));

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'transparent',
  },
  container: {
    flexGrow: 1,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

const FOOTER_HEIGHT = 80;

const FooterView = variance(View)(() => ({
  root: {
    height: FOOTER_HEIGHT,
    paddingHorizontal: Gutter.Middle,
    justifyContent: 'flex-end',
  },
}));
