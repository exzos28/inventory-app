import React, {useCallback, useRef} from 'react';

import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {ModalRef} from '../../components';
import {ChangeProjectModal} from '../../screens/ChangeProjectModal';
import {useRoot} from '../../core';
import {ProjectId} from '../../core/HadesServer';

export default observer(function ChangeProjectBinding({
  navigation,
}: RootStackBindingProps<'ChangeProject'>) {
  const {
    projectStore: {selectedProject, selectProject, projects},
  } = useRoot();
  const goToCreateProject = useCallback(
    () => navigation.navigate('CreateProject'),
    [navigation],
  );
  const changeProject = useCallback(
    (id: ProjectId) => selectProject(id),
    [selectProject],
  );
  const modalRef = useRef<ModalRef>(null);
  return (
    <ChangeProjectModal
      projects={projects || []}
      ref={modalRef}
      onModalClosed={navigation.goBack}
      onCreateButtonPress={goToCreateProject}
      selectedProject={selectedProject}
      onProjectItemPress={changeProject}
    />
  );
});
