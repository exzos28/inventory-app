import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {CheckSvg} from '../../assets/svg';
import {Locale, useTheme, variance} from '../../core';
import {SvgProps} from 'react-native-svg';

export type ListItem = {
  Icon: React.ComponentType<SvgProps>;
  text: string;
  value: Locale;
};

export type LanguageSettingsScreenItemProps = {
  item: ListItem;
  onPress: () => void;
  selected: boolean;
};

export default observer(function LanguageItem({
  item,
  onPress,
  selected,
}: LanguageSettingsScreenItemProps) {
  const theme = useTheme();
  const Icon = item.Icon;
  return (
    <Root onPress={onPress} activeOpacity={0.8}>
      <Icon width={30} height={22} />
      <LanguageText selected={selected}>{item.text}</LanguageText>
      <CheckIcon>
        {selected && <CheckSvg color={theme.palette['color-primary-400']} />}
      </CheckIcon>
    </Root>
  );
});

const Root = variance(TouchableOpacity)(() => ({
  root: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
}));

const LanguageText = variance(Text)(theme => ({
  root: {
    fontSize: 16,
    marginLeft: 15,
    color: theme.palette['text-basic-color'],
  },
  selected: {
    color: theme.palette['color-primary-400'],
  },
}));

const CheckIcon = variance(View)(() => ({
  root: {
    marginLeft: 'auto',
  },
}));
