import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import App from './App';
import {RootProvider, RootServiceFactory} from './core/Root';
import codePush from 'react-native-code-push';

const factory = new RootServiceFactory();

export default codePush({checkFrequency: codePush.CheckFrequency.MANUAL})(
  () => {
    return (
      <SafeAreaProvider>
        <RootProvider rootServiceFactory={factory}>
          <App />
        </RootProvider>
      </SafeAreaProvider>
    );
  },
);
