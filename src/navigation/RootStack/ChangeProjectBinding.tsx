import React, {useRef} from 'react';

import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {ModalRef} from '../../components';
import {ChangeProjectModal} from '../../screens/ChangeProjectModal';

export default observer(function ChangeProjectBinding({
  navigation,
}: RootStackBindingProps<'ChangeProject'>) {
  const modalRef = useRef<ModalRef>(null);
  return (
    <ChangeProjectModal ref={modalRef} onModalClosed={navigation.goBack} />
  );
});
