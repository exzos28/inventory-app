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
import {variance} from '../../core';
import UserItem from './UserItem';

type FindUserScreenProps = {
  searchValue: string;
  onChangeText: (_: string) => void;
};

export default observer(function FindUserScreen({
  searchValue,
  onChangeText,
}: FindUserScreenProps) {
  const renderItem = () => <UserItem />;
  return (
    <List
      data={data}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        <SearchView level="1">
          <Input
            autoFocus
            placeholder="Start typing..."
            value={searchValue}
            onChangeText={onChangeText}
            accessoryLeft={SearchIcon}
          />
        </SearchView>
      }
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
});

const SearchIcon = (props: IconProps) => (
  <Icon {...props} name="search-outline" />
);

const data = new Array(8).fill({
  title: 'Item',
  description: 'Description for Item',
});

const SearchView = variance(Layout)(() => ({
  root: {
    padding: 16,
  },
}));
