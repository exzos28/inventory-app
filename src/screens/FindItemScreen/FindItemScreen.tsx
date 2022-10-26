import React from 'react';
import {observer} from 'mobx-react-lite';
import {NavigationIQKeyboardManager} from '../../Navigation/components';
import FindItemList, {
  ItemListProps,
} from '../../components/modules/ItemList/ItemList';
import {variance} from '../../core';
import {Layout} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type FindUserScreenProps = ItemListProps & {
  searchValue: string;
  onChangeText: (_: string) => void;
};

export default observer(function FindUserScreen({
  searchValue,
  onChangeText,
  onItemPress,
  data,
}: FindUserScreenProps) {
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom;
  return (
    <RootNavigationIQKeyboardManager>
      <RootLayout>
        <FindItemList
          searchValue={searchValue}
          onChangeText={onChangeText}
          onItemPress={onItemPress}
          data={data}
          contentContainerStyle={{paddingBottom}}
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
