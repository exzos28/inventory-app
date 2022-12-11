import {ReadonlyDeep} from 'type-fest';
import {LocaleDict} from './core/Localization/LocaleStrings';
import {UserRole} from './core/HadesServer';

export function translateUserRole(
  role: UserRole,
  strings: ReadonlyDeep<LocaleDict>,
) {
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
