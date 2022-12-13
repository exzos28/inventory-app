import React, {useCallback, useRef} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from '../RootStackBindingProps';
import {GENERAL_REST_CLIENT_ERROR, useRoot, useStrings} from '../../../core';
import useGoToUnknownError from '../useGoToUnknownError';
import {
  InviteUserToProjectScreen,
  InviteUserToProjectFormValues,
} from '../../../screens/InviteUserToProjectScreen';
import {FormRef} from '../../../core/ReactHookFormUtil';

export default observer(function InviteUserToProjectBinding({
  navigation,
}: RootStackBindingProps<'InviteUserToProject'>) {
  const {projectUsersHelper} = useRoot();
  const strings = useStrings();
  const goToUnknownError = useGoToUnknownError(navigation);
  const formRef = useRef<FormRef<InviteUserToProjectFormValues>>(null);
  const inviteUser = useCallback(
    async (values: InviteUserToProjectFormValues) => {
      const invite_ = await projectUsersHelper.inviteUser(values);
      if (invite_.success) {
        return navigation.goBack();
      }
      const isNotFound =
        invite_.left.kind === GENERAL_REST_CLIENT_ERROR &&
        invite_.left.statusCode === 404;
      if (isNotFound) {
        formRef.current?.setError('email', {
          message: strings['inviteUserScreen.notFoundError'],
        });
      } else {
        return goToUnknownError(invite_.left);
      }
    },
    [goToUnknownError, navigation, projectUsersHelper, strings],
  );
  return (
    <InviteUserToProjectScreen formRef={formRef} onInvitePress={inviteUser} />
  );
});
