import React from 'react';

import {observer} from 'mobx-react-lite';

import {useTheme, variance} from '../../core/styling';
import {Button, Icon, Layout} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import Leveler from '../../components/Leveler';
import {Bubble, JustifyContent} from '../../components';
import {ItemList, ItemListProps} from '../../components/modules/ItemList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationIQKeyboardManager} from '../../Navigation/components';
import {ItemId} from '../../tempTypes';
import {useStrings} from '../../core';

export type ItemsSelectionForUserScreenProps = Exclude<
  ItemListProps,
  'rightAccessory'
> & {
  getSelectedItems: () => ItemId[];
  onSubmitPress: () => void;
};

const ABSOLUTE_BUTTON_HEIGHT = 85;

export default observer(function ItemsSelectionForUserScreen({
  onChangeText,
  searchValue,
  data,
  onItemPress,
  onItemLongPress,
  getSelectedItems,
  onSubmitPress,
}: ItemsSelectionForUserScreenProps) {
  const strings = useStrings();
  const items = getSelectedItems();
  const insets = useSafeAreaInsets();
  const visibleSubmitButton = items.length !== 0;
  const absoluteButtonHeight = visibleSubmitButton
    ? insets.bottom / 2 + ABSOLUTE_BUTTON_HEIGHT
    : insets.bottom;
  return (
    <RootNavigationIQKeyboardManager>
      <RootLayout>
        <ItemList
          onChangeText={onChangeText}
          searchValue={searchValue}
          onItemPress={onItemPress}
          onItemLongPress={onItemLongPress}
          contentContainerStyle={{paddingBottom: absoluteButtonHeight}}
          data={data}
          rightAccessory={item =>
            items.includes(item.id) ? (
              <RightAccessory />
            ) : (
              <RightAccessoryView />
            )
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
      </RootLayout>
    </RootNavigationIQKeyboardManager>
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

const RootNavigationIQKeyboardManager = variance(NavigationIQKeyboardManager)(
  () => ({
    root: {
      flex: 1,
    },
  }),
);

const RootLayout = variance(Layout)(() => ({
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
