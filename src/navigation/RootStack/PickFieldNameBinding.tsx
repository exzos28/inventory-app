import React, {useCallback, useRef} from 'react';

import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {PickFieldNameModal} from '../../screens/PickFieldNameModal';
import {ModalRef} from '../../components';

export default observer(function PickFieldNameBinding({
  navigation,
  route,
}: RootStackBindingProps<'PickFieldName'>) {
  const modalRef = useRef<ModalRef>(null);

  const previousScreen = route.params.fromScreen;

  const cancel = useCallback(
    () =>
      navigation.navigate({
        name: previousScreen,
        params: {pickedValue: undefined},
        merge: true,
      }),
    [navigation, previousScreen],
  );

  const submit = useCallback(
    async (_: string) => {
      await modalRef.current?.close();
      navigation.navigate({
        name: previousScreen,
        params: {pickedValue: {label: _}},
        merge: true,
      });
    },
    [navigation, previousScreen],
  );

  return (
    <PickFieldNameModal
      ref={modalRef}
      onSubmit={submit}
      onModalClosed={cancel}
    />
  );
});
