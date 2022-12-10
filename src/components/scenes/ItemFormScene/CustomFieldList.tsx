import React, {useCallback} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';

import {observer} from 'mobx-react-lite';

import {variance} from '../../../core/styling';
import {Control, Controller, useFieldArray} from 'react-hook-form';
import {Button, Icon, IconProps, Input} from '@ui-kitten/components';
import {Space} from '../../index';
import {ItemFormValues} from './types';
import {Either, useStrings} from '../../../core';

export type CustomFieldListProps = {
  control: Control<ItemFormValues>;
  onNewFieldNameRequest: () => Promise<Either<string, void>>;
};

export default observer(function CustomFieldList({
  control,
  onNewFieldNameRequest,
}: CustomFieldListProps) {
  const strings = useStrings();
  const {fields, append, remove} = useFieldArray<ItemFormValues>({
    control,
    name: 'customFields',
  });
  const onAppendPress = useCallback(async () => {
    const response = await onNewFieldNameRequest();
    if (response.success) {
      append({label: response.right, value: ''});
    }
  }, [append, onNewFieldNameRequest]);
  const accessoryRight = useCallback(
    (props: IconProps, index: number) => (
      <TouchableWithoutFeedback onPress={() => remove(index)}>
        <Icon {...props} name="trash-2-outline" />
      </TouchableWithoutFeedback>
    ),
    [remove],
  );
  return (
    <RootView>
      <Space>
        {fields.length !== 0 && (
          <Space>
            {fields.map((item, index) => (
              <Controller
                key={item.id}
                render={({field: {onChange, onBlur, value: fieldValue}}) => (
                  <Input
                    label={fieldValue.label}
                    onChangeText={newValue =>
                      onChange({...fieldValue, value: newValue})
                    }
                    onBlur={onBlur}
                    value={fieldValue.value}
                    accessoryRight={props => accessoryRight(props, index)}
                  />
                )}
                name={`customFields.${index}`}
                control={control}
              />
            ))}
          </Space>
        )}
        <Button
          onPress={onAppendPress}
          accessoryLeft={PlusIcon}
          appearance="ghost"
          size="small">
          {strings['createItemScreen.createFieldButton']}
        </Button>
      </Space>
    </RootView>
  );
});

const PlusIcon = (props: IconProps) => <Icon {...props} name="plus-outline" />;

const RootView = variance(View)(() => ({
  root: {},
}));
