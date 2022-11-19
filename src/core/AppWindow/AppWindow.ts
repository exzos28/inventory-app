import {RouterSource} from '../structure';

export interface AppWindow {
  readonly updates: RouterSource<AppWindowStateRouterMap>;
  getStatus(): AppWindowStatus;
}

export type AppWindowStateRouterMap = Record<
  AppWindowStatus,
  (status: AppWindowStatus) => void
> &
  Record<AppFocusStatus, (isFocused: boolean) => void>;

export type AppFocusStatus = typeof APP_WINDOW_FOCUS | typeof APP_WINDOW_BLUR;

export type AppWindowStatus =
  | typeof APP_WINDOW_ACTIVE
  | typeof APP_WINDOW_BACKGROUND
  | typeof APP_WINDOW_INACTIVE
  | typeof APP_WINDOW_EXTENSION
  | typeof APP_WINDOW_UNKNOWN;

export const APP_WINDOW_ACTIVE = Symbol();
export const APP_WINDOW_BACKGROUND = Symbol();
export const APP_WINDOW_INACTIVE = Symbol();
export const APP_WINDOW_EXTENSION = Symbol();
export const APP_WINDOW_UNKNOWN = Symbol();

export const APP_WINDOW_FOCUS = Symbol();
export const APP_WINDOW_BLUR = Symbol();
