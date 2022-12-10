import {PromiseState} from '../AsyncAtom';
import {GlobalError} from '../Error';
import {ProjectResponse} from '../ProjectRestClient';
import {Either} from '../fp';
import {ProjectId} from '../HadesServer';

export interface ProjectStore {
  readonly selectedProject: Project | undefined;
  readonly state: PromiseState<Project[], GlobalError> | undefined;
  readonly projects: Project[] | undefined;
  fetch(): Promise<Either<void, GlobalError>>;
  selectProject(id: ProjectId): void;
}

export type Project = ProjectResponse;
