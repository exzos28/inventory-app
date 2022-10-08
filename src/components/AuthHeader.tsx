import {observer} from 'mobx-react-lite';
import {createStylesHook, useRoot} from '../core';
import React, {useMemo} from 'react';
import {expr} from 'mobx-utils';
import {LANGUAGES} from '../screens/ChangeLanguageScreen/LanguageList';
import {Pressable, View} from 'react-native';
import {
  Divider,
  Icon,
  IconProps,
  TopNavigation,
  TopNavigationAction,
  TopNavigationActionProps,
} from '@ui-kitten/components';
import {StackHeaderProps} from '@react-navigation/stack/lib/typescript/src/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type HeaderProps = StackHeaderProps & {
  onLanguagePress: () => void;
};

const BackIcon = (props: IconProps) => <Icon {...props} name="arrow-back" />;

const BackAction = (props: TopNavigationActionProps) => (
  <TopNavigationAction icon={BackIcon} {...props} />
);

export const AuthHeader = observer((props: HeaderProps) => {
  const {options, navigation, onLanguagePress} = props;
  const {translation} = useRoot();
  const AccessoryLeft = useMemo(() => {
    if (navigation.canGoBack()) {
      return <BackAction onPress={navigation.goBack} />;
    }
    return undefined;
  }, [navigation]);
  const selectedLocale = expr(() =>
    LANGUAGES.find(_ => _.value === translation.locale),
  );
  const themedStyles = useThemedStyles();
  const AccessoryRight = useMemo(() => {
    const LocaleIcon = selectedLocale?.Icon;
    if (LocaleIcon) {
      return (
        <Pressable style={themedStyles.langButton} onPress={onLanguagePress}>
          <LocaleIcon />
        </Pressable>
      );
    }
    return undefined;
  }, [onLanguagePress, selectedLocale, themedStyles]);
  const insets = useSafeAreaInsets();
  return (
    <View style={{paddingTop: insets.top}}>
      <TopNavigation
        alignment="center"
        accessoryLeft={AccessoryLeft}
        accessoryRight={AccessoryRight}
        title={options.title}
      />
      <Divider />
    </View>
  );
});

const useThemedStyles = createStylesHook(theme => ({
  langButton: {
    elevation: 1,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    shadowColor: theme.palette['border-alternative-color-4'],
  },
}));
