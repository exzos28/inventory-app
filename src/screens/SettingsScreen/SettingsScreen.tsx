import React from 'react';
import {observer} from 'mobx-react-lite';
import {IconProps, Layout, Menu, MenuItem} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {useStrings} from '../../core';

export type SettingsScreenProps = {
  onSelectLanguagePress: () => void;
  onThemePress: () => void;
  LanguageIcon: (props: IconProps) => JSX.Element;
  ThemeIcon: (props: IconProps) => JSX.Element;
};

export default observer(function SettingsScreen({
  onSelectLanguagePress,
  onThemePress,
  LanguageIcon,
  ThemeIcon,
}: SettingsScreenProps) {
  const strings = useStrings();
  return (
    <Layout style={styles.root} level="1">
      <Menu style={styles.list}>
        <MenuItem
          onPress={onSelectLanguagePress}
          title={strings['settingsScreen.languageItem']}
          accessoryRight={LanguageIcon}
        />
        <MenuItem
          onPress={onThemePress}
          title={strings['settingsScreen.themeItem']}
          accessoryRight={ThemeIcon}
        />
      </Menu>
    </Layout>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
