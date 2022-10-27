import {useNavigation} from '@react-navigation/native';
import {useCallback, useLayoutEffect, useState} from 'react';
import {observable, runInAction} from 'mobx';
import {batchDisposers, Disposer} from '../core';

export default () => {
  const navigation = useNavigation();
  const [box] = useState(() => observable.box(true));
  useLayoutEffect(() => {
    const onFocus = () => runInAction(() => box.set(true));
    const onBlur = () => runInAction(() => box.set(false));
    return batchDisposers(
      navigation.addListener('focus', onFocus) as Disposer,
      navigation.addListener('blur', onBlur) as Disposer,
    );
  }, [box, navigation]);
  return useCallback(() => box.get(), [box]);
};
