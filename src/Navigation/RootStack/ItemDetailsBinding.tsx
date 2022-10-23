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
import {useNavigation} from '@react-navigation/native';

export default observer(function ItemDetailsBinding({
  navigation,
}: RootStackBindingProps<'ItemDetails'>) {
  return (
    <ItemDetailsScreen item={ITEMS[0]} onTransferPress={navigation.goBack} />
  );
});

export const ItemDetailsHeader = observer((props: HeaderProps) => {
  const navigation =
    useNavigation<RootStackBindingProps<'ItemDetails'>['navigation']>();
  return (
    <Header
      {...props}
      accessoryRight={
        <EditAction onPress={() => navigation.navigate('EditItem')} />
      }
    />
  );
});

const EditAction = (props: TopNavigationActionProps) => (
  <TopNavigationAction icon={EditIcon} {...props} />
);
const EditIcon = (props: IconProps) => <Icon {...props} name="edit-outline" />;
