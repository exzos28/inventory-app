import {StyleSheet} from 'react-native';
import createStylesHook from './createStylesHook';
import {Theme} from '../Theme';

export default <
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
>(
  factory: (theme: Theme) => T | StyleSheet.NamedStyles<T>,
) => createStylesHook(factory)();
