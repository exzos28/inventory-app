import React from 'react';
import {observer} from 'mobx-react-lite';
import {NavigationIQKeyboardManager} from '../../../navigation/components';
import FindItemList, {ItemListProps} from '../../organisms/ItemList/ItemList';
import {useTheme, variance} from '../../../core';
import {Icon, Layout} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Leveler from '../../Leveler';
import {JustifyContent} from '../../types';
import {StyleSheet, View} from 'react-native';

export type FindItemSceneProps = ItemListProps & {};

export default observer(function FindItemScene({
  contentContainerStyle,
  ...rest
}: FindItemSceneProps) {
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom;
  return (
    <RootNavigationIQKeyboardManager>
      <RootLayout>
        <FindItemList
          {...rest}
          contentContainerStyle={[{paddingBottom}, contentContainerStyle]}
        />
      </RootLayout>
    </RootNavigationIQKeyboardManager>
  );
});

export const RightCheckAccessory = observer(() => {
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

export const RightArrowAccessory = observer(() => {
  const theme = useTheme();
  return (
    <Leveler justify={JustifyContent.Center}>
      <Icon
        name="chevron-right-outline"
        style={styles.icon}
        fill={theme.palette['color-basic-600']}
      />
    </Leveler>
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

export const RightAccessoryView = variance(View)(() => ({
  root: {
    width: 50,
    alignItems: 'flex-end',
  },
}));

const RootLayout = variance(Layout)(() => ({
  root: {
    flex: 1,
  },
}));
