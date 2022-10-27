import React from 'react';

import {observer} from 'mobx-react-lite';

import {useTheme, variance} from '../../core/styling';
import {Button, Icon} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import Leveler from '../../components/Leveler';
import {Bubble, JustifyContent} from '../../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ItemId} from '../../tempTypes';
import {useStrings} from '../../core';
import {
  FindItemScene,
  FindItemSceneProps,
} from '../../components/scenes/FindItemScene';

export type ItemsSelectionForUserScreenProps = FindItemSceneProps & {
  getSelectedItems: () => ItemId[];
  onSubmitPress: () => void;
};

const ABSOLUTE_BUTTON_HEIGHT = 85;

export default observer(function ItemsSelectionForUserScreen({
  getSelectedItems,
  onSubmitPress,
  ...rest
}: ItemsSelectionForUserScreenProps) {
  const strings = useStrings();
  const items = getSelectedItems();
  const insets = useSafeAreaInsets();
  const visibleSubmitButton = items.length !== 0;
  const absoluteButtonHeight = visibleSubmitButton
    ? insets.bottom / 2 + ABSOLUTE_BUTTON_HEIGHT
    : insets.bottom;
  return (
    <RootView>
      <FindItemScene
        {...rest}
        rightAccessory={item =>
          items.includes(item.id) ? <RightAccessory /> : <RightAccessoryView />
        }
      />
      {items.length !== 0 && (
        <AbsoluteButtonView style={{height: absoluteButtonHeight}}>
          <AbsoluteButtonBubble>
            <Button onPress={onSubmitPress}>
              {strings['itemsSelectionForUserScreen.transferButton']}
            </Button>
          </AbsoluteButtonBubble>
        </AbsoluteButtonView>
      )}
    </RootView>
  );
});

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

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});

const RootView = variance(View)(() => ({
  root: {
    flex: 1,
  },
}));

const RightAccessoryView = variance(View)(() => ({
  root: {
    width: 50,
    alignItems: 'flex-end',
  },
}));

const AbsoluteButtonView = variance(View)(() => ({
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

const AbsoluteButtonBubble = variance(Bubble)(() => ({
  root: {
    height: ABSOLUTE_BUTTON_HEIGHT,
  },
}));
