import {AppStateStatus} from 'react-native';
import {
  APP_WINDOW_ACTIVE,
  APP_WINDOW_BACKGROUND,
  APP_WINDOW_EXTENSION,
  APP_WINDOW_INACTIVE,
  APP_WINDOW_UNKNOWN,
  AppWindowStatus,
} from './AppWindow';

export default class AppWindowStatic {
  static translateStatus(status: AppStateStatus): AppWindowStatus {
    switch (status) {
      case 'active':
        return APP_WINDOW_ACTIVE;
      case 'background':
        return APP_WINDOW_BACKGROUND;
      case 'inactive':
        return APP_WINDOW_INACTIVE;
      case 'extension':
        return APP_WINDOW_EXTENSION;
      default:
        return APP_WINDOW_UNKNOWN;
    }
  }
}
