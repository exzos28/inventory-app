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
import {useStrings, variance} from '../../core';
import Item from './Item';

type FindUserScreenProps = {
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
  const renderItem = () => <Item onPress={goToItemDetails} />;
  return (
    <List
      data={data}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        <SearchView level="1">
          <Input
            autoFocus
            placeholder={strings['findItem.input']}
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
