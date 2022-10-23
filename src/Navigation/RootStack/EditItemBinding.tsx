import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {error, success} from '../../core';
import {Alert} from 'react-native';
import usePromisifyNavigation from './usePromisifyNavigation';
import {InputsResult} from '../../scenes/ItemFormScene';
import {EditItemScreen} from '../../screens/EditItemScreen';

type EditItemBindingProps = RootStackBindingProps<'EditItem'>;

export default observer(function EditItemBinding({
  navigation,
}: EditItemBindingProps) {
  const {promisifyNavigate} = usePromisifyNavigation<
    EditItemBindingProps['route']
  >(() => navigation.navigate('PickFieldName', {fromScreen: 'EditItem'}));

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

  return (
    <EditItemScreen
      onNewFieldNameRequest={onNewFieldNameRequest}
      onCreatePress={edit}
    />
  );
});
