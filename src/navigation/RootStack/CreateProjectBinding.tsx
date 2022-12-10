import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {CreateProjectScreen} from '../../screens/CreateProjectScreen';
import {CreateProjectFormValues} from '../../screens/CreateProjectScreen/CreateProjectScreen';
import {useRoot} from '../../core';
import useGoToUnknownError from './useGoToUnknownError';

export default observer(function CreateProjectBinding({
  navigation,
}: RootStackBindingProps<'CreateProject'>) {
  const {projectStore, projectRestClientHelper} = useRoot();
  const goToUnknownError = useGoToUnknownError(navigation);
  const createProject = useCallback(
    async (values: CreateProjectFormValues) => {
      const create_ = await projectRestClientHelper.create({name: values.name});
      if (!create_.success) {
        return goToUnknownError(create_.left);
      }
      const fetch_ = await projectStore.fetch();
      if (!fetch_.success) {
        return goToUnknownError(fetch_.left);
      }
      return navigation.goBack();
    },
    [goToUnknownError, navigation, projectRestClientHelper, projectStore],
  );
  return <CreateProjectScreen onCreateProjectPress={createProject} />;
});
