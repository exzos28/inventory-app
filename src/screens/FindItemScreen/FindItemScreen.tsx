import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {
  Divider,
  Icon,
  IconProps,
  Input,
  Layout,
  List,
} from '@ui-kitten/components';
import {useStrings, variance} from '../../core';
import Item from './Item';
import {ITEMS} from '../../MOCK';
import {Item as ItemType} from '../../tempTypes';
import {FlatListProps, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationIQKeyboardManager} from '../../Navigation/components';

export type FindUserScreenProps = {
  searchValue: string;
  onChangeText: (_: string) => void;
  goToItemDetails: () => void;
};

export default observer(function FindUserScreen({
  searchValue,
  onChangeText,
  goToItemDetails,
}: FindUserScreenProps) {
  const strings = useStrings();
  const renderItem: ListProps['renderItem'] = useCallback(
    ({item}) => <Item onPress={goToItemDetails} item={item} />,
    [goToItemDetails],
  );
  const insets = useSafeAreaInsets();
  return (
    <NavigationIQKeyboardManager>
      <List
        data={ITEMS}
        stickyHeaderIndices={[0]}
        contentContainerStyle={[
          styles.container,
          {paddingBottom: insets.bottom},
        ]}
        ListHeaderComponent={
          <SearchView level="1">
            <Input
              size="large"
              autoFocus
              placeholder={strings['findItemScreen.input']}
              value={searchValue}
              onChangeText={onChangeText}
              accessoryLeft={SearchIcon}
            />
          </SearchView>
        }
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </NavigationIQKeyboardManager>
  );
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

type ListProps = FlatListProps<ItemType>;

const SearchIcon = (props: IconProps) => (
  <Icon {...props} name="search-outline" />
);

const SearchView = variance(Layout)(() => ({
  root: {
    padding: 16,
  },
}));
