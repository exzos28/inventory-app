import React, {useCallback, useState} from 'react';
import {
  Divider,
  Icon,
  IconProps,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {observer} from 'mobx-react-lite';
import {useNavigation} from '@react-navigation/native';
import {RootStackBindingProps} from '../../navigation/RootStack/RootStackBindingProps';
import {FULFILLED, useRoot, useStrings, useTheme, variance} from '../../core';
import {
  AlignItems,
  Bubble,
  Direction,
  Gutter,
  RippleButton,
  Space,
} from '../../components';
import {translateUserRole} from '../../tempHelper';

export default observer(function MenuScreenHeader() {
  const theme = useTheme();
  const strings = useStrings();
  const navigation =
    useNavigation<RootStackBindingProps<'Menu'>['navigation']>();
  const {authHelper, accountStore, projectStore} = useRoot();
  const [menuVisible, setMenuVisible] = useState(false);

  const goToSettings = useCallback(() => {
    setMenuVisible(false);
    navigation.navigate('Settings');
  }, [navigation]);
  const goToChangeProject = useCallback(
    () => navigation.navigate('ChangeProject'),
    [navigation],
  );
  const goToAuth = useCallback(async () => {
    setMenuVisible(false);
    await authHelper.signOut();
  }, [authHelper]);

  const toggleMenu = useCallback(
    () => setMenuVisible(!menuVisible),
    [menuVisible],
  );
  const renderMenuAction = useCallback(
    () => <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />,
    [toggleMenu],
  );

  const renderOverflowMenuAction = useCallback(
    () => (
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem
          onPress={goToSettings}
          accessoryLeft={SettingsIcon}
          title={strings['menuScreen.header.menu.settings']}
        />
        <MenuItem
          onPress={goToAuth}
          accessoryLeft={LogoutIcon}
          title={strings['menuScreen.header.menu.logout']}
        />
      </OverflowMenu>
    ),
    [
      goToAuth,
      goToSettings,
      menuVisible,
      renderMenuAction,
      strings,
      toggleMenu,
    ],
  );

  const getProjectName = useCallback(() => {
    if (projectStore.selectedProject) {
      return projectStore.selectedProject.project.name;
    }
    return '';
  }, [projectStore.selectedProject]);

  const getDescribedUser = useCallback(() => {
    if (
      projectStore.selectedProject &&
      accountStore.state?.status === FULFILLED
    ) {
      return `${accountStore.state.result.nickname}, ${translateUserRole(
        projectStore.selectedProject.role,
        strings,
      )}`;
    }
    return '';
  }, [accountStore.state, projectStore.selectedProject, strings]);

  const renderTitle = useCallback(
    () => (
      <Space>
        <ProjectButton onPress={goToChangeProject}>
          <Bubble gutter={[Gutter.Tiny, Gutter.Small]}>
            <Space
              direction={Direction.Row}
              align={AlignItems.Center}
              gutter={Gutter.Small}>
              <Space gutter={Gutter.Tiny}>
                <ProjectIcon
                  style={styles.projectIcon}
                  fill={theme.palette['color-basic-800']}
                />
              </Space>

              <Space gutter={Gutter.Tiny}>
                <Text category="s1">{getProjectName()}</Text>
                <Text category="s2">{getDescribedUser()}</Text>
              </Space>
            </Space>
          </Bubble>
        </ProjectButton>
      </Space>
    ),
    [goToChangeProject, theme.palette, getProjectName, getDescribedUser],
  );

  const insets = useSafeAreaInsets();
  return (
    <View style={{paddingTop: insets.top}}>
      <View style={styles.content}>
        <TopNavigation
          title={renderTitle}
          accessoryRight={renderOverflowMenuAction}
        />
        <Divider />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  content: {
    height: 65,
  },
  projectIcon: {
    width: 18,
    height: 18,
  },
});

const ProjectIcon = (props: IconProps) => (
  <Icon {...props} name="arrow-ios-downward-outline" />
);
const MenuIcon = (props: IconProps) => <Icon {...props} name="more-vertical" />;

const LogoutIcon = (props: IconProps) => <Icon {...props} name="log-out" />;
const SettingsIcon = (props: IconProps) => (
  <Icon {...props} name="settings-outline" />
);

const ProjectButton = variance(RippleButton)(() => ({
  root: {
    borderRadius: 10,
    paddingRight: 10,
  },
}));
