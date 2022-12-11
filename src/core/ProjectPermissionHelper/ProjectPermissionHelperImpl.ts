import {ProjectPermissionHelper} from './ProjectPermissionHelper';
import {UserRole} from '../HadesServer';
import {ProjectStore} from '../ProjectStore';
import {bind} from '../fp';

export default class ProjectPermissionHelperImpl
  implements ProjectPermissionHelper
{
  constructor(
    private readonly _root: {
      readonly projectStore: ProjectStore;
    },
  ) {}

  private static readonly ROLE_HIERARCHY = [
    UserRole.User,
    UserRole.Manager,
    UserRole.Admin,
    UserRole.Owner,
  ];

  isSomeRoleOrBetter = bind((from: UserRole) => {
    const currentRole = this._root.projectStore.selectedProject?.role;
    if (!currentRole) {
      return false;
    }
    const currentRoleIdx =
      ProjectPermissionHelperImpl.ROLE_HIERARCHY.indexOf(currentRole);
    const minRoleIdx = ProjectPermissionHelperImpl.ROLE_HIERARCHY.indexOf(from);
    return currentRoleIdx >= minRoleIdx;
  }, this);
}
