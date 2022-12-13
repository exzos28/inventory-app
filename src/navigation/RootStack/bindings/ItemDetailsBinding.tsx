import React, {useCallback, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {ItemDetailsScreen} from '../../../screens/ItemDetailsScreen';
import {RootStackBindingProps} from '../RootStackBindingProps';
import {HeaderProps} from '../../components/Header/Header';
import {Header} from '../../components/Header';
import {
  Icon,
  IconProps,
  TopNavigationAction,
  TopNavigationActionProps,
} from '@ui-kitten/components';
import {useNavigation, useRoute} from '@react-navigation/native';
import ItemDetailsStateImpl from '../../../core/ItemDetailsState/ItemDetailsStateImpl';
import {PENDING, REJECTED, useRoot, useStrings} from '../../../core';
import {ErrorScreen} from '../../../screens/ErrorScreen';
import useNavigationGetIsFocused from '../../hooks/useNavigationGetIsFocused';
import {autorun} from 'mobx';
import {Alert} from 'react-native';
import {UserRole} from '../../../core/HadesServer';

export type ItemDetailsBindingProps = RootStackBindingProps<'ItemDetails'>;

export default observer(function ItemDetailsBinding({
  route,
  navigation,
}: ItemDetailsBindingProps) {
  const root = useRoot();
  const strings = useStrings();
  const {itemHelper} = root;
  const itemId = route.params.id;
  const [pageState] = useState(() => new ItemDetailsStateImpl(root));
  const {state} = pageState;
  const getIsFocused = useNavigationGetIsFocused();
  useEffect(
    () => autorun(() => getIsFocused() && pageState.fetch(itemId)),
    [getIsFocused, itemId, pageState],
  );
  const deleteItem = useCallback(async () => {
    await itemHelper.delete({id: itemId});
    navigation.goBack();
  }, [itemId, itemHelper, navigation]);
  const promptDeleteItem = useCallback(async () => {
    return Alert.alert(
      strings['common.warning'],
      strings['itemDetails.deleteAlert.description'],
      [
        {
          text: strings['common.yes'],
          onPress: deleteItem,
          style: 'default',
        },
        {
          text: strings['common.cancel'],
          style: 'cancel',
        },
      ],
    );
  }, [deleteItem, strings]);
  const addQr = useCallback(
    () => navigation.navigate('QrItemMarking', {id: itemId}),
    [itemId, navigation],
  );
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
    <ItemDetailsScreen
      detailedItem={state.result}
      onDeletePress={promptDeleteItem}
      onAddQrPress={addQr}
    />
  );
});

export const ItemDetailsHeader = observer((props: HeaderProps) => {
  const {
    projectPermissionHelper: {isSomeRoleOrBetter},
  } = useRoot();
  const navigation = useNavigation<ItemDetailsBindingProps['navigation']>();
  const route = useRoute<ItemDetailsBindingProps['route']>();
  const id = route.params.id;
  return (
    <Header
      {...props}
      accessoryRight={
        isSomeRoleOrBetter(UserRole.Manager) ? (
          <EditAction onPress={() => navigation.navigate('EditItem', {id})} />
        ) : undefined
      }
    />
  );
});

const EditAction = (props: TopNavigationActionProps) => (
  <TopNavigationAction icon={EditIcon} {...props} />
);
const EditIcon = (props: IconProps) => <Icon {...props} name="edit-outline" />;
