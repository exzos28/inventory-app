import React, {useCallback, useMemo} from 'react';
import {observer} from 'mobx-react-lite';
import {
  Button,
  Divider,
  Icon,
  IconProps,
  Input,
  Layout,
  List,
} from '@ui-kitten/components';
import Item, {ExternalItemProps} from '../../molecules/Item';
import {FlatListProps, StyleSheet} from 'react-native';
import {useRoot, useStrings, variance} from '../../../core';
import {Item as ItemType} from '../../../core/ItemHelper';
import EmptyList from '../../EmptyList';
import {UserRole} from '../../../core/HadesServer';

export type ItemListProps = Omit<ListProps, 'renderItem'> &
  ExternalItemProps & {
    searchValue?: string;
    onChangeText?: (_: string) => void;
    withSearch?: boolean;
    data: ItemType[];
    onCreatePress: () => void;
    visibleCreateButton?: boolean;
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
  onCreatePress,
  visibleCreateButton = true,
  ...rest
}: ItemListProps) {
  const {
    projectPermissionHelper: {isSomeRoleOrBetter},
  } = useRoot();
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
  const filtered = useMemo(() => {
    const sorted = data.sort((a, b) => b.id - a.id);
    if (searchValue) {
      return sorted.filter(_ => {
        const searchValue_ = searchValue.toLowerCase();
        const name_ = _.name.toLowerCase() || '';
        const serialNumber_ = _.serialNumber?.toLowerCase() || '';
        return (
          name_.includes(searchValue_) || serialNumber_.includes(searchValue_)
        );
      });
    }
    return sorted;
  }, [data, searchValue]);
  return (
    <List
      data={filtered}
      stickyHeaderIndices={withSearch ? [0] : []}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      ListEmptyComponent={
        <EmptyListView>
          <EmptyList>
            {visibleCreateButton && isSomeRoleOrBetter(UserRole.Manager) && (
              <Button onPress={onCreatePress}>
                {strings['common.create']}
              </Button>
            )}
          </EmptyList>
        </EmptyListView>
      }
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

export const EmptyListView = variance(Layout)(() => ({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
}));

const SearchView = variance(Layout)(() => ({
  root: {
    padding: 16,
  },
}));
