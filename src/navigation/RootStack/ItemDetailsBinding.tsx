import React, {useCallback, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {ItemDetailsScreen} from '../../screens/ItemDetailsScreen';
import {RootStackBindingProps} from './RootStackBindingProps';
import {HeaderProps} from '../components/Header/Header';
import {Header} from '../components/Header';
import {
  Icon,
  IconProps,
  TopNavigationAction,
  TopNavigationActionProps,
} from '@ui-kitten/components';
import {useNavigation, useRoute} from '@react-navigation/native';
import ItemDetailsStateImpl from '../../core/ItemDetailsState/ItemDetailsStateImpl';
import {PENDING, REJECTED, useRoot} from '../../core';
import {ErrorScreen} from '../../screens/ErrorScreen';
import useNavigationGetIsFocused from '../useNavigationGetIsFocused';
import {autorun} from 'mobx';
import {Alert} from 'react-native';

export type ItemDetailsBindingProps = RootStackBindingProps<'ItemDetails'>;

export default observer(function ItemDetailsBinding({
  route,
  navigation,
}: ItemDetailsBindingProps) {
  const root = useRoot();
  const {itemRestClientHelper} = root;
  const itemId = route.params.id;
  const [pageState] = useState(() => new ItemDetailsStateImpl(root, itemId));
  const {state} = pageState;
  const getIsFocused = useNavigationGetIsFocused();
  useEffect(
    () => autorun(() => getIsFocused() && pageState.fetch()),
    [getIsFocused, pageState],
  );
  const deleteItem = useCallback(async () => {
    await itemRestClientHelper.delete({id: itemId});
    navigation.goBack();
  }, [itemId, itemRestClientHelper, navigation]);
  // TODO l10n
  const promptDeleteItem = useCallback(async () => {
    return Alert.alert(
      'Warning',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Yes',
          onPress: deleteItem,
          style: 'default',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  }, [deleteItem]);
  if (state === undefined || state.status === PENDING) {
    return null;
  }
  if (state.status === REJECTED) {
    return (
      <ErrorScreen
        onReturnPress={navigation.goBack}
        raw={state.error}
        description={state.error.description}
      />
    );
  }
  return (
    <ItemDetailsScreen item={state.result} onDeletePress={promptDeleteItem} />
  );
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
