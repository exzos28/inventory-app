import {UserRole} from '../HadesServer';
import {ReadonlyDeep} from 'type-fest';
import {LocaleDict} from '../Localization/LocaleStrings';

export default abstract class StaticRoleFormatterImpl {
  static translateUserRole(role: UserRole, strings: ReadonlyDeep<LocaleDict>) {
    switch (role) {
      case UserRole.Owner:
        return strings['role.owner'];
      case UserRole.Admin:
        return strings['role.admin'];
      case UserRole.Manager:
        return strings['role.manager'];
      case UserRole.User:
      default:
        return strings['role.user'];
    }
  }
}
