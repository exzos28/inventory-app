import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {CreateItemScreen} from '../../screens/CreateItemScreen';
import {RootStackBindingProps} from './RootStackBindingProps';
import {error, success} from '../../core';
import {Alert} from 'react-native';
import usePromisifyNavigation from './usePromisifyNavigation';
import {InputsResult} from '../../components/scenes/ItemFormScene';
import {ITEMS} from '../../MOCK';

type CreateItemBindingProps = RootStackBindingProps<'CreateItem'>;

export default observer(function CreateItemBinding({
  navigation,
}: CreateItemBindingProps) {
  const {promisifyNavigate} = usePromisifyNavigation<
    CreateItemBindingProps['route']
  >(() => navigation.navigate('PickFieldName', {fromScreen: 'CreateItem'}));

  const onNewFieldNameRequest = useCallback(async () => {
    const response = await promisifyNavigate();
    if (response.success) {
      const pickedValue = response.right?.pickedValue;
      if (pickedValue) {
        return success(pickedValue.label);
      }
    }
    return error(undefined);
  }, [promisifyNavigate]);

  const create = useCallback(
    (_: InputsResult) => {
      const str = JSON.stringify(_, null, 1);
      Alert.alert('Result', str);
      navigation.replace('ItemDetails', {id: ITEMS[0].id});
    },
    [navigation],
  );

  return (
    <CreateItemScreen
      onNewFieldNameRequest={onNewFieldNameRequest}
      onCreatePress={create}
    />
  );
});
