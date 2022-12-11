import {UserRole} from '../HadesServer';

export interface ProjectPermissionHelper {
  isSomeRoleOrBetter(role: UserRole): boolean;
}
