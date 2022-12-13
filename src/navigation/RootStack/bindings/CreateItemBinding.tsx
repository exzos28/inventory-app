import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {CreateItemScreen} from '../../../screens/CreateItemScreen';
import {RootStackBindingProps} from '../RootStackBindingProps';
import {error, success, useRoot} from '../../../core';
import usePromisifyNavigation from '../usePromisifyNavigation';
import {ItemFormValues} from '../../../components/scenes/ItemFormScene';
import useGoToUnknownError from '../useGoToUnknownError';

type CreateItemBindingProps = RootStackBindingProps<'CreateItem'>;

export default observer(function CreateItemBinding({
  navigation,
}: CreateItemBindingProps) {
  const {itemHelper} = useRoot();
  const {promisifyNavigate} = usePromisifyNavigation<
    CreateItemBindingProps['route']
  >(() => navigation.navigate('PickFieldName', {fromScreen: 'CreateItem'}));

  const goToUnknownError = useGoToUnknownError(navigation);
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
    async (_: ItemFormValues) => {
      const create_ = await itemHelper.create({
        item: {
          image: _.image,
          name: _.name,
          serialNumber: _.serialNumber,
          customFields: _.customFields,
        },
      });
      if (!create_.success) {
        return goToUnknownError(create_.left);
      }
      navigation.goBack();
    },
    [goToUnknownError, itemHelper, navigation],
  );

  return (
    <CreateItemScreen
      onNewFieldNameRequest={onNewFieldNameRequest}
      onCreatePress={create}
    />
  );
});
