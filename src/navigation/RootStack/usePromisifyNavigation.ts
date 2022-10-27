import {useCallback, useEffect, useRef} from 'react';
import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import {Either, error, success} from '../../core';
import {RouteProp} from '@react-navigation/core/src/types';

type PromiseResolve<R> = (_: Either<R, void>) => void;

export default function usePromisifyNavigation<
  R extends RouteProp<ParamListBase>,
>(navigate: () => void) {
  const navigation = useNavigation();
  const route = useRoute<R>();
  const promiseResolveRef = useRef<PromiseResolve<R['params']>>();
  useEffect(
    () =>
      navigation.addListener('focus', () => {
        if (promiseResolveRef.current === undefined) {
          return;
        }
        const params = route.params;
        navigation.setParams(undefined);
        if (params) {
          promiseResolveRef.current(success(params));
        } else {
          promiseResolveRef.current(error(undefined));
        }
        promiseResolveRef.current = undefined;
      }),
    [navigation, route.params],
  );

  const promisifyNavigate = useCallback(() => {
    navigate();
    return new Promise((resolve: PromiseResolve<R['params']>) => {
      promiseResolveRef.current = resolve;
    });
  }, [navigate]);

  return {promisifyNavigate};
}
