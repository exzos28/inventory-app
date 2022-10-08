import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Text} from '@ui-kitten/components';
import {variance} from '../../core';

export type ListItemProps = {
  onPress: () => void;
  title: string;
  description?: string;
  accessoryRight?: React.FC;
};

export default observer(function ListItem(props: ListItemProps) {
  const {title, description, onPress, accessoryRight: AccessoryRight} = props;
  const [pressed, setPressed] = useState(false);
  return (
    <RootView
      pressed={pressed}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      activeOpacity={0.8}>
      <LeftView>
        <LanguageText>{title}</LanguageText>
        {description && <DescText>{description}</DescText>}
      </LeftView>
      <Right>{AccessoryRight && <AccessoryRight />}</Right>
    </RootView>
  );
});

const RootView = variance(TouchableOpacity)(theme => ({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  pressed: {
    backgroundColor: theme.palette['background-basic-color-2'],
  },
}));

const LeftView = variance(View)(() => ({
  root: {
    flex: 1,
  },
}));

const LanguageText = variance(Text)(theme => ({
  root: {
    fontWeight: '500',
    fontSize: 16,
    color: theme.palette['text-basic-color'],
  },
}));

const DescText = variance(Text)(() => ({
  root: {
    marginTop: 5,
    fontSize: 12,
  },
}));

const Right = variance(View)(() => ({
  root: {
    flex: 1,
    alignItems: 'flex-end',
  },
}));
