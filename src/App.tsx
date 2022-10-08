import React from 'react';
import {observer} from 'mobx-react-lite';
import {StatusBar, View} from 'react-native';
import {useRoot, useTheme, variance} from './core';
import {NavigationRoot} from './Navigation';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AssetIconsPack, FlagsIconsPack} from './assets/AssetsIconsPack';

export default observer(function App() {
  const {appearance} = useRoot();
  const theme = useTheme();
  return (
    <>
      <IconRegistry icons={[EvaIconsPack, AssetIconsPack, FlagsIconsPack]} />
      <ApplicationProvider {...eva} theme={theme.palette}>
        <Root>
          <StatusBar
            barStyle={appearance.isDark ? 'light-content' : 'dark-content'}
          />
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
