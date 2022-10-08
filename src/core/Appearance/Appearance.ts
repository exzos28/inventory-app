import {Theme} from '../styling';
import {Bound} from '../fp';

export interface Appearance {
  readonly systemThemeKind: SystemThemeKind;
  readonly preferredThemeKind: PreferredThemeKind;
  readonly isDark: boolean;
  togglePreferredThemeKind: Bound<() => Promise<void>, Appearance>;
  toggleThemeKind: Bound<() => Promise<void>, Appearance>;
  setThemeMode: Bound<(next: ThemeKind) => Promise<void>, Appearance>;
  readonly actualThemeKind: ActualThemeKind;
  readonly theme: Theme;
}

export enum ThemeKind {
  Unknown,
  Light,
  Dark,
  Auto,
}

export type SystemThemeKind =
  | ThemeKind.Light
  | ThemeKind.Dark
  | ThemeKind.Unknown;
export type PreferredThemeKind = ThemeKind;
export type ActualThemeKind = ThemeKind.Light | ThemeKind.Dark;
