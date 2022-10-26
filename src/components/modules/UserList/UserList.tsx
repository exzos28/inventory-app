import React from 'react';
import {observer} from 'mobx-react-lite';
import {
  Divider,
  Icon,
  IconProps,
  Input,
  Layout,
  List,
} from '@ui-kitten/components';
import {useStrings, variance} from '../../../core';
import {FlatListProps, StyleSheet} from 'react-native';
import {UserType} from '../../../tempTypes';
import UserItem, {ExternalItemProps} from './UserItem';

export type UserListProps = Omit<ListProps, 'renderItem'> &
  ExternalItemProps & {
    searchValue?: string;
    onChangeText?: (_: string) => void;
    withSearch?: boolean;
  };

export default observer(function UserList({
  searchValue,
  onChangeText,
  data,
  rightAccessory,
  onItemPress,
  contentContainerStyle,
  withSearch = true,
}: UserListProps) {
  const strings = useStrings();
  const renderItem: ListProps['renderItem'] = ({item}) => (
    <UserItem
      onItemPress={onItemPress}
      item={item}
      rightAccessory={rightAccessory}
    />
  );
  return (
    <List
      data={data}
      stickyHeaderIndices={withSearch ? [0] : []}
      ListHeaderComponent={
        withSearch ? (
          <SearchView level="1">
            <Input
              size="large"
              placeholder={strings['findUserScreen.input']}
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
      contentContainerStyle={[styles.container, contentContainerStyle]}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

type ListProps = FlatListProps<UserType>;

const keyExtractor: ListProps['keyExtractor'] = item => String(item.id);

const SearchIcon = (props: IconProps) => (
  <Icon {...props} name="search-outline" />
);

const SearchView = variance(Layout)(() => ({
  root: {
    padding: 16,
  },
}));
