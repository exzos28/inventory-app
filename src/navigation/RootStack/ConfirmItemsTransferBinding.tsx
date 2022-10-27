import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {ITEMS, USERS} from '../../MOCK';
import {ConfirmItemsScreen} from '../../screens/ConfirmItemsScreen';
import {Alert} from 'react-native';
import {ItemType} from '../../tempTypes';

export default observer(function ConfirmItemsTransferBinding({
  navigation,
  route,
}: RootStackBindingProps<'ConfirmItemsTransfer'>) {
  const {items, forUser} = route.params;
  const data = ITEMS.filter(_ => items.includes(_.id));
  const user = USERS.find(_ => _.id === forUser);

  const goToDetails = useCallback(
    (item: ItemType) => navigation.navigate('ItemDetails', {id: item.id}),
    [navigation],
  );

  const onSubmit = useCallback(() => {
    Alert.alert('Result', 'Transaction has been created');
    navigation.popToTop();
  }, [navigation]);

  if (!user) {
    return null;
  }

  return (
    <ConfirmItemsScreen
      onItemPress={goToDetails}
      data={data}
      user={user}
      onSubmitPress={onSubmit}
    />
  );
});
