import React from 'react';

import {observer} from 'mobx-react-lite';

import {variance} from '../../core/styling';
import {Button} from '@ui-kitten/components';
import {View} from 'react-native';
import {Bubble} from '../../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useStrings} from '../../core';
import {
  FindItemScene,
  FindItemSceneProps,
  RightAccessoryView,
  RightCheckAccessory,
} from '../../components/scenes/FindItemScene';
import {ItemId} from '../../core/HadesServer';
import {expr} from 'mobx-utils';
import {Item} from '../../core/ItemHelper';

export type SelectItemsForTransferScreenProps = FindItemSceneProps & {
  getSelectedIds: () => ItemId[];
  onSubmitPress: () => void;
  data: Item[];
};

const ABSOLUTE_BUTTON_HEIGHT = 85;

export default observer(function SelectItemsForTransferScreen({
  getSelectedIds,
  onSubmitPress,
  data,
  ...rest
}: SelectItemsForTransferScreenProps) {
  const strings = useStrings();
  const items = getSelectedIds();
  const insets = useSafeAreaInsets();
  const visibleSubmitButton = items.length !== 0;
  const absoluteButtonHeight = visibleSubmitButton
    ? insets.bottom / 2 + ABSOLUTE_BUTTON_HEIGHT
    : insets.bottom;
  const isEmpty = expr(
    () => data.length === 0 || getSelectedIds().length === 0,
  );
  return (
    <RootView>
      <FindItemScene
        {...rest}
        data={data}
        rightAccessory={item =>
          items.includes(item.id) ? (
            <RightCheckAccessory />
          ) : (
            <RightAccessoryView />
          )
        }
      />
      {!isEmpty && (
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

const RootView = variance(View)(() => ({
  root: {
    flex: 1,
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
