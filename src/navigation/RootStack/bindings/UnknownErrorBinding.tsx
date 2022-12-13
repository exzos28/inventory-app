import React from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from '../RootStackBindingProps';
import {ErrorScreen} from '../../../screens/ErrorScreen';

export type UnknownErrorBindingProps = RootStackBindingProps<'UnknownError'>;

export default observer(function UnknownErrorBinding({
  navigation,
  route,
}: UnknownErrorBindingProps) {
  const {description, raw} = route.params ?? {};
  return (
    <ErrorScreen
      onReturnPress={navigation.goBack}
      raw={raw}
      description={description}
    />
  );
});
