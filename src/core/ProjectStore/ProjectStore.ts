import {PromiseState} from '../AsyncAtom';
import {GlobalError} from '../Error';
import {ProjectResponse} from '../ProjectRestClient';
import {ProjectId, UserRole} from '../HadesServer';
import {Maybe} from '../Maybe';

export interface ProjectStore {
  readonly selectedProject: SelectedProject | undefined;
  readonly state: PromiseState<Project[], GlobalError> | undefined;
  readonly projects: Project[] | undefined;
  fetch(): Promise<Maybe<void>>;
  selectProject(id: ProjectId): Promise<Maybe<void>>;
}

export type Project = ProjectResponse;
export type SelectedProject = {
  project: Project;
  role: UserRole;
};
