import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import App from './App';
import {RootProvider, RootServiceFactory} from './core/Root';

const factory = new RootServiceFactory();

export default () => {
  return (
    <SafeAreaProvider>
      <RootProvider rootServiceFactory={factory}>
        <App />
      </RootProvider>
    </SafeAreaProvider>
  );
};
