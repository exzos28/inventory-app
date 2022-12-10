import {ProjectId} from '../HadesServer';
import {JsonString} from '../Json';

export type KeyValueMap = {
  [K in string]: string;
} & {
  selectedProjectId: JsonString<ProjectId>;
};
