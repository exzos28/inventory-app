import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from '../RootStackBindingProps';
import {SettingsScreen} from '../../../screens/SettingsScreen';
import {useRoot} from '../../../core';
import {expr} from 'mobx-utils';
import {LANGUAGES} from '../../../screens/ChangeLanguageScreen/LanguageList';
import {Icon, IconProps} from '@ui-kitten/components';
import {ThemeKind} from '../../../core/Appearance';

export type SettingsBindingProps = RootStackBindingProps<'Settings'>;

export default observer(function SettingsBinding({
  navigation,
}: SettingsBindingProps) {
  const {translation, appearance} = useRoot();
  const goToSelectLanguage = useCallback(() => {
    navigation.navigate('ChangeLanguage');
  }, [navigation]);
  const changeTheme = useCallback(async () => {
    await appearance.togglePreferredThemeKind();
  }, [appearance]);
  const selectedLocale = expr(() =>
    LANGUAGES.find(_ => _.value === translation.locale),
  );
  const LanguageIcon = useCallback(
    (props: IconProps) => {
      const LocaleIcon = selectedLocale?.Icon;
      return <LocaleIcon {...props} />;
    },
    [selectedLocale],
  );
  const ThemeIcon = useCallback(
    (props: IconProps) => {
      switch (appearance.preferredThemeKind) {
        case ThemeKind.Dark:
          return <MoonOutlineIcon {...props} />;
        case ThemeKind.Light:
          return <SunOutlineIcon {...props} />;
        case ThemeKind.Auto:
        default:
          return <ClockOutlineIcon {...props} />;
      }
    },
    [appearance],
  );
  return (
    <SettingsScreen
      LanguageIcon={LanguageIcon}
      ThemeIcon={ThemeIcon}
      onSelectLanguagePress={goToSelectLanguage}
      onThemePress={changeTheme}
    />
  );
});

const SunOutlineIcon = (props: IconProps) => (
  <Icon name="sun-outline" {...props} />
);

const MoonOutlineIcon = (props: IconProps) => (
  <Icon name="moon-outline" {...props} />
);

const ClockOutlineIcon = (props: IconProps) => (
  <Icon name="clock-outline" {...props} />
);
