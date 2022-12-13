import {ParamListBase, RouteProp, useRoute} from '@react-navigation/native';
import {useCallback, useLayoutEffect, useState} from 'react';
import {action, observable} from 'mobx';
import {StackNavigationProp} from '@react-navigation/stack';
import {batchDisposers, Disposer} from '../../core';

export default <T extends ParamListBase>(
  navigation: StackNavigationProp<T, keyof T>,
) => {
  const route = useRoute<RouteProp<T, keyof T>>();
  const [box] = useState(() =>
    observable.box(true, {name: `${route.name} transition`}),
  );
  useLayoutEffect(() => {
    const onStart = action(() => box.set(true));
    const onEnd = action(() => box.set(false));
    return batchDisposers(
      navigation.addListener('transitionStart', onStart) as Disposer,
      navigation.addListener('transitionEnd', onEnd) as Disposer,
    );
  }, [box, navigation]);
  return useCallback(() => box.get(), [box]);
};
