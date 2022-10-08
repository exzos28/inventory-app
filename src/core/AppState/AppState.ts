export enum AppStatus {
  Active,
  Background,
  Inactive,
  Unknown,
  Extension,
}

export interface AppState {
  readonly status: AppStatus;
  readonly isFocused: boolean;
}
