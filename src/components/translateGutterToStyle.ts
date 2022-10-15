import {StyleProp, ViewStyle} from 'react-native';

import {AvailableGutter} from './types';

export default function translateGutterToStyle(
  gutter: AvailableGutter,
): StyleProp<ViewStyle> {
  if (!Array.isArray(gutter)) {
    return {
      padding: Number(gutter),
    };
  } else if (gutter.length === 2) {
    return {
      paddingVertical: gutter[0],
      paddingHorizontal: gutter[1],
    };
  } else if (gutter.length === 3) {
    return {
      paddingTop: gutter[0],
      paddingHorizontal: gutter[1],
      paddingBottom: gutter[2],
    };
  } else if (gutter.length === 4) {
    return {
      paddingTop: gutter[0],
      paddingRight: gutter[1],
      paddingBottom: gutter[2],
      paddingLeft: gutter[3],
    };
  }
  return {};
}
