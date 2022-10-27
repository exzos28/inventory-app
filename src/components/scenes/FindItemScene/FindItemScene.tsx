import React from 'react';
import {observer} from 'mobx-react-lite';
import {NavigationIQKeyboardManager} from '../../../navigation/components';
import FindItemList, {ItemListProps} from '../../organisms/ItemList/ItemList';
import {variance} from '../../../core';
import {Layout} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
