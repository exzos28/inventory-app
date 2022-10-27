import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {error, success} from '../../core';
import {Alert} from 'react-native';
import usePromisifyNavigation from './usePromisifyNavigation';
import {InputsResult} from '../../components/scenes/ItemFormScene';
import {EditItemScreen} from '../../screens/EditItemScreen';
import {ITEMS} from '../../MOCK';

type EditItemBindingProps = RootStackBindingProps<'EditItem'>;

export default observer(function EditItemBinding({
  navigation,
  route,
}: EditItemBindingProps) {
  const {promisifyNavigate} = usePromisifyNavigation<
    EditItemBindingProps['route']
  >(() => navigation.navigate('PickFieldName', {fromScreen: 'EditItem'}));
  const id = route.params.id;
  const item = ITEMS.find(_ => _.id === id);

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

  const edit = useCallback((_: InputsResult) => {
    const str = JSON.stringify(_, null, 1);
    Alert.alert('Result', str);
  }, []);

  if (!item) {
    return null;
  }

  return (
    <EditItemScreen
      onNewFieldNameRequest={onNewFieldNameRequest}
      onCreatePress={edit}
      item={item}
    />
  );
});
