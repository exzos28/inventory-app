import {observer} from 'mobx-react-lite';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Platform} from 'react-native';
import {AuthStack} from '../AuthStack';
import ChangeLanguageBinding from './ChangeLanguageBinding';
import {useStrings} from '../../core';
import MenuScreenBinding from './MenuBinding';
import MenuScreenHeader from '../../screens/MenuScreen/MenuScreenHeader';
import ScanQRBinding from './ScanQRBinding';
import DefaultHeader from '../../components/DefaultHeader';
import SettingsBinding from './SettingsBinding';

export type RootParamList = {
  Account: undefined;
  Auth: undefined;
  Menu: undefined;
  Settings: undefined;
  ScanQR: undefined;
  ChangeLanguage: undefined;
};

const {Navigator, Screen, Group} = createStackNavigator<RootParamList>();

export const RootStack = observer(() => {
  const strings = useStrings();
  return (
    <Navigator screenOptions={{cardShadowEnabled: true}}>
      <Group>
        <Screen
          name="Menu"
          options={{
            header: props => <MenuScreenHeader {...props} />,
          }}
          component={MenuScreenBinding}
        />
        <Screen
          name="Settings"
          options={{
            title: 'Settings',
            header: props => <DefaultHeader {...props} />,
          }}
          component={SettingsBinding}
        />
      </Group>
      <Group
        screenOptions={{
          headerShown: false,
        }}>
        <Screen name="Auth" component={AuthStack} />
      </Group>
      <Screen
        options={{
          title: 'Scan QR',
          header: props => <DefaultHeader {...props} />,
        }}
        name="ScanQR"
        component={ScanQRBinding}
      />
      <Group
        screenOptions={{
          cardOverlayEnabled: Platform.OS === 'ios', // Fix flick
          presentation: 'modal',
        }}>
        <Screen
          name="ChangeLanguage"
          component={ChangeLanguageBinding}
          options={() => ({
            title: strings['changeLanguage.title'],
            header: props => <DefaultHeader {...props} presentation="modal" />,
          })}
        />
      </Group>
    </Navigator>
  );
});
