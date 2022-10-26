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
import Item, {ExternalItemProps} from './Item';
import {FlatListProps, StyleSheet} from 'react-native';
import {useStrings, variance} from '../../../core';
import {ItemType} from '../../../tempTypes';

export type ItemListProps = Omit<ListProps, 'renderItem'> &
  ExternalItemProps & {
    searchValue?: string;
    onChangeText?: (_: string) => void;
    withSearch?: boolean;
  };

export default observer(function ItemList({
  data,
  searchValue,
  onChangeText,
  onItemPress,
  onItemLongPress,
  rightAccessory,
  contentContainerStyle,
  withSearch = true,
  ...rest
}: ItemListProps) {
  const strings = useStrings();
  const renderItem: ListProps['renderItem'] = useCallback(
    ({item}) => (
      <Item
        rightAccessory={rightAccessory}
        onItemPress={onItemPress}
        onItemLongPress={onItemLongPress}
        item={item}
      />
    ),
    [onItemLongPress, onItemPress, rightAccessory],
  );
  return (
    <List
      data={data}
      stickyHeaderIndices={withSearch ? [0] : []}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      ListHeaderComponent={
        withSearch ? (
          <SearchView level="1">
            <Input
              size="large"
              placeholder={strings['findItemScreen.input']}
              value={searchValue}
              onChangeText={onChangeText}
              accessoryLeft={SearchIcon}
            />
          </SearchView>
        ) : null
      }
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      {...rest}
    />
  );
});

type ListProps = FlatListProps<ItemType>;

const keyExtractor: ListProps['keyExtractor'] = item => String(item.id);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

const SearchIcon = (props: IconProps) => (
  <Icon {...props} name="search-outline" />
);

const SearchView = variance(Layout)(() => ({
  root: {
    padding: 16,
  },
}));
