import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MobileRootServiceFactoryImpl} from './Root';
import {RootProvider} from './core';
import App from './App';

const factory = new MobileRootServiceFactoryImpl();

export default () => {
  return (
    <SafeAreaProvider>
      <RootProvider rootServiceFactory={factory}>
        <App />
      </RootProvider>
    </SafeAreaProvider>
  );
};
