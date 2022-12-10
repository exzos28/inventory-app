import React, {useCallback, useEffect, useRef, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {error, PENDING, REJECTED, success, useRoot} from '../../core';
import usePromisifyNavigation from './usePromisifyNavigation';
import {ItemFormValues} from '../../components/scenes/ItemFormScene';
import {EditItemScreen} from '../../screens/EditItemScreen';
import ItemDetailsStateImpl from '../../core/ItemDetailsState/ItemDetailsStateImpl';
import {ErrorScreen} from '../../screens/ErrorScreen';
import {autorun} from 'mobx';
import useNavigationGetIsFocused from '../useNavigationGetIsFocused';
import useGoToUnknownError from './useGoToUnknownError';

type EditItemBindingProps = RootStackBindingProps<'EditItem'>;

export default observer(function EditItemBinding({
  navigation,
  route,
}: EditItemBindingProps) {
  const {promisifyNavigate} = usePromisifyNavigation<
    EditItemBindingProps['route']
  >(() => navigation.navigate('PickFieldName', {fromScreen: 'EditItem'}));
  const itemId = route.params.id;
  const root = useRoot();
  const {itemRestClientHelper} = root;
  const [pageState] = useState(() => new ItemDetailsStateImpl(root, itemId));
  const {state} = pageState;
  const busyRef = useRef(false);

  const getIsFocused = useNavigationGetIsFocused();
  useEffect(
    () =>
      autorun(() => getIsFocused() && !busyRef.current && pageState.fetch()),
    [getIsFocused, pageState],
  );

  const goToUnknownError = useGoToUnknownError(navigation);

  const onNewFieldNameRequest = useCallback(async () => {
    busyRef.current = true;
    const response = await promisifyNavigate();
    busyRef.current = false;
    if (response.success) {
      const pickedValue = response.right?.pickedValue;
      if (pickedValue) {
        return success(pickedValue.label);
      }
    }
    return error(undefined);
  }, [promisifyNavigate]);

  const edit = useCallback(
    async (_: ItemFormValues, touchedKeys: keyof ItemFormValues) => {
      console.log('VALUES', _);
      const update_ = await itemRestClientHelper.update({
        id: itemId,
        item: {
          image: touchedKeys.includes('image')
            ? _.image
            : _.image === undefined
            ? null // for delete
            : undefined,
          name: _.name,
          serialNumber: _.serialNumber,
          customFields: _.customFields,
        },
      });
      if (!update_.success) {
        return goToUnknownError(update_.left);
      }
      navigation.goBack();
    },
    [goToUnknownError, itemId, itemRestClientHelper, navigation],
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
    <EditItemScreen
      onNewFieldNameRequest={onNewFieldNameRequest}
      onCreatePress={edit}
      item={state.result}
    />
  );
});
