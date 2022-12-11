import React, {useMemo} from 'react';
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
import UserItem, {ExternalItemProps} from '../../molecules/UserItem';
import {User} from '../../../core/ProjectUsersHelper';

export type UserListProps = Omit<ListProps, 'renderItem'> &
  ExternalItemProps & {
    searchValue?: string;
    onChangeText?: (_: string) => void;
    withSearch?: boolean;
    data: User[];
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
  const filtered = useMemo(() => {
    const sorted = data.sort((a, b) => b.id - a.id);
    if (searchValue) {
      return sorted.filter(_ => {
        const searchValue_ = searchValue.toLowerCase();
        const username_ = _.username.toLowerCase() || '';
        const email_ = _.email.toLowerCase() || '';
        return (
          email_.includes(searchValue_) || username_.includes(searchValue_)
        );
      });
    }
    return sorted;
  }, [data, searchValue]);
  return (
    <List
      data={filtered}
      stickyHeaderIndices={withSearch ? [0] : []}
      ListHeaderComponent={
        withSearch ? (
          <SearchView level="1">
            <Input
              size="large"
              autoCapitalize="none"
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

type ListProps = FlatListProps<User>;

const keyExtractor: ListProps['keyExtractor'] = item => String(item.id);

const SearchIcon = (props: IconProps) => (
  <Icon {...props} name="search-outline" />
);

const SearchView = variance(Layout)(() => ({
  root: {
    padding: 16,
  },
}));
