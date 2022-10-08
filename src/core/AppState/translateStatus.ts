import {AppStateStatus} from 'react-native';
import {AppStatus} from './AppState';

export default (status: AppStateStatus) => {
  switch (status) {
    case 'active':
      return AppStatus.Active;
    case 'background':
      return AppStatus.Background;
    case 'inactive':
      return AppStatus.Inactive;
    case 'extension':
      return AppStatus.Extension;
    default:
      return AppStatus.Unknown;
  }
};
