import React, {useCallback} from 'react';
import {
  Avatar,
  Divider,
  Icon,
  IconProps,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigation,
  TopNavigationAction,
  TextProps,
} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {observer} from 'mobx-react-lite';
import {useNavigation} from '@react-navigation/native';
import {RootStackBindingProps} from '../../Navigation/RootStack/RootStackBindingProps';
import {useStrings} from '../../core';

export default observer(function MenuScreenHeader() {
  const navigation =
    useNavigation<RootStackBindingProps<'Menu'>['navigation']>();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const toggleMenu = useCallback(() => {
    setMenuVisible(!menuVisible);
  }, [menuVisible]);
  const renderMenuAction = useCallback(
    () => <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />,
    [toggleMenu],
  );
  const goToSettings = useCallback(() => {
    setMenuVisible(false);
    navigation.navigate('Settings');
  }, [navigation]);
  const goToAuth = useCallback(() => {
    setMenuVisible(false);
    navigation.replace('Auth');
  }, [navigation]);
  const strings = useStrings();
  const renderOverflowMenuAction = useCallback(
    () => (
      <React.Fragment>
        <OverflowMenu
          anchor={renderMenuAction}
          visible={menuVisible}
          onBackdropPress={toggleMenu}>
          <MenuItem
            onPress={goToSettings}
            accessoryLeft={SettingsIcon}
            title={strings['menu.header.menu.settings']}
          />
          <MenuItem
            onPress={goToAuth}
            accessoryLeft={LogoutIcon}
            title={strings['menu.header.menu.logout']}
          />
        </OverflowMenu>
      </React.Fragment>
    ),
    [goToAuth, goToSettings, menuVisible, renderMenuAction, toggleMenu],
  );
  const renderTitle = useCallback(
    (props?: TextProps) => (
      <View style={styles.titleContainer}>
        <Avatar
          style={styles.logo}
          source={{
            uri: 'https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png',
          }}
        />
        <Text {...props}>Test User</Text>
      </View>
    ),
    [],
  );
  const insets = useSafeAreaInsets();
  return (
    <View style={{paddingTop: insets.top}}>
      <TopNavigation
        title={renderTitle}
        accessoryRight={renderOverflowMenuAction}
      />
      <Divider />
    </View>
  );
});

const MenuIcon = (props: IconProps) => <Icon {...props} name="more-vertical" />;

const LogoutIcon = (props: IconProps) => <Icon {...props} name="log-out" />;
const SettingsIcon = (props: IconProps) => (
  <Icon {...props} name="settings-outline" />
);

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginHorizontal: 16,
  },
});
