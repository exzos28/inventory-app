import React, {useCallback, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MobileRootServiceFactoryImpl} from './Root';
import {RootProvider} from './core';
import App from './App';
import {Platform} from 'react-native';
// import RNKeyboardManager from 'react-native-keyboard-manager';

const factory = new MobileRootServiceFactoryImpl();

export default () => {
  const onFocusEffect = useCallback(() => {
    if (Platform.OS === 'ios') {
      // RNKeyboardManager.setEnable(true);
    }
    return () => {
      if (Platform.OS === 'ios') {
        // RNKeyboardManager.setEnable(false);
      }
    };
  }, []);

  useEffect(onFocusEffect);
  return (
    <SafeAreaProvider>
      <RootProvider rootServiceFactory={factory}>
        <App />
      </RootProvider>
    </SafeAreaProvider>
  );
};
