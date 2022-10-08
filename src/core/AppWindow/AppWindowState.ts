import {AppWindowStatus} from './AppWindow';

export interface AppWindowState {
  readonly status: AppWindowStatus;
  readonly isFocused: boolean;
}
