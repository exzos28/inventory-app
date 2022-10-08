import {ImageStyle, ScaledSize, TextStyle, ViewStyle} from 'react-native';

export interface Adaptive {
  readonly window: ScaledSize;
  readonly screen: ScaledSize;
  mediaQuery(query: MediaQuery): ViewStyle | TextStyle | ImageStyle;
}

export type MediaQuery = {
  [key: number]: ViewStyle | TextStyle | ImageStyle;
};
