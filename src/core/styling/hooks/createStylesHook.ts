import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Theme, useTheme} from '../Theme';

export default <
    T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
  >(
    factory: (theme: Theme) => T | StyleSheet.NamedStyles<T>,
  ) =>
  (): T => {
    const theme = useTheme();
    return useMemo(() => factory(theme) as T, [theme]);
  };
