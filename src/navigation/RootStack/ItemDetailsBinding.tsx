import React from 'react';
import {observer} from 'mobx-react-lite';
import {ItemDetailsScreen} from '../../screens/ItemDetailsScreen';
import {RootStackBindingProps} from './RootStackBindingProps';
import {ITEMS} from '../../MOCK';
import {HeaderProps} from '../components/Header/Header';
import {Header} from '../components/Header';
import {
  Icon,
  IconProps,
  TopNavigationAction,
  TopNavigationActionProps,
} from '@ui-kitten/components';
import {useNavigation, useRoute} from '@react-navigation/native';

export type ItemDetailsBindingProps = RootStackBindingProps<'ItemDetails'>;

export default observer(function ItemDetailsBinding({
  route,
}: ItemDetailsBindingProps) {
  const itemId = route.params.id;
  const item = ITEMS.find(_ => _.id === itemId);
  if (!item) {
    return null;
  }
  return <ItemDetailsScreen item={item} />;
});

export const ItemDetailsHeader = observer((props: HeaderProps) => {
  const navigation = useNavigation<ItemDetailsBindingProps['navigation']>();
  const route = useRoute<ItemDetailsBindingProps['route']>();
  const id = route.params.id;
  return (
    <Header
      {...props}
      accessoryRight={
        <EditAction onPress={() => navigation.navigate('EditItem', {id})} />
      }
    />
  );
});

const EditAction = (props: TopNavigationActionProps) => (
  <TopNavigationAction icon={EditIcon} {...props} />
);
const EditIcon = (props: IconProps) => <Icon {...props} name="edit-outline" />;
