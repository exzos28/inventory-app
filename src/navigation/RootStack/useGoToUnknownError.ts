import {useCallback} from 'react';
import {GlobalError} from '../../core';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from './RootStack';

export default function useGoToUnknownError<T extends RootParamList>(
  navigation: StackNavigationProp<T, keyof T>,
) {
  return useCallback(
    (err: GlobalError) =>
      navigation.navigate('UnknownError', {
        raw: err,
        description: err.description,
      }),
    [navigation],
  );
}
