import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {Platform, StatusBar, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {useRoot, useTheme, variance} from './core';
import {NavigationRoot} from './navigation';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AssetIconsPack, FlagsIconsPack} from './assets/AssetsIconsPack';

export default observer(function App() {
  const {appearance} = useRoot();
  const theme = useTheme();
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true, duration: 500});
    });
  }, []);
  return (
    <>
      <IconRegistry icons={[EvaIconsPack, AssetIconsPack, FlagsIconsPack]} />
      <ApplicationProvider {...eva} theme={theme.palette}>
        <Root>
          {Platform.OS === 'ios' && (
            <StatusBar
              barStyle={appearance.isDark ? 'light-content' : 'dark-content'}
            />
          )}
          <NavigationRoot />
        </Root>
      </ApplicationProvider>
    </>
  );
});

const Root = variance(View)(theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.palette['background-basic-color-2'],
  },
}));
