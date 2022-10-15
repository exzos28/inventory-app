import {observer} from 'mobx-react-lite';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Platform} from 'react-native';
import ChangeLanguageBinding from './ChangeLanguageBinding';
import {useStrings} from '../../core';
import MenuScreenBinding from './MenuBinding';
import MenuScreenHeader from '../../screens/MenuScreen/MenuScreenHeader';
import ScanQRBinding from './ScanQRBinding';
import {TopNavigation} from '../../components/TopNavigation';
import SettingsBinding from './SettingsBinding';
import FindUserBinding from './FindUserBinding';
import FindItemBinding from './FindItemBinding';
import ItemDetailsBinding from './ItemDetailsBinding';
import CreateItemBinding from './CreateItemBinding';
import SignInBinding from '../AuthStack/SignInBinding';
import SignUpBinding from '../AuthStack/SignUpBinding';

export type RootParamList = {
  Menu: undefined;
  FindItem: undefined;
  ItemDetails: undefined;
  CreateItem: undefined;
  FindUser: undefined;

  Account: undefined;
  Settings: undefined;
  ScanQR: undefined;
  ChangeLanguage: undefined;

  Auth: undefined;
  SignUp: undefined;
};

const {Navigator, Screen, Group} = createStackNavigator<RootParamList>();

export const RootStack = observer(() => {
  const strings = useStrings();
  return (
    <Navigator
      screenOptions={{cardShadowEnabled: true}}
      initialRouteName="Menu">
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
            header: props => <TopNavigation {...props} />,
          }}
          component={SettingsBinding}
        />
        <Screen
          name="FindItem"
          options={{
            title: strings['findItem.headerTitle'],
            header: props => <TopNavigation {...props} />,
          }}
          component={FindItemBinding}
        />
        <Screen
          name="ItemDetails"
          options={{
            title: strings['itemDetails.headerTitle'],
            header: props => <TopNavigation {...props} />,
          }}
          component={ItemDetailsBinding}
        />
        <Screen
          name="CreateItem"
          options={{
            title: strings['createItem.headerTitle'],
            header: props => <TopNavigation {...props} />,
          }}
          component={CreateItemBinding}
        />
        <Screen
          name="FindUser"
          options={{
            title: 'Find user',
            header: props => <TopNavigation {...props} />,
          }}
          component={FindUserBinding}
        />
      </Group>
      <Screen
        options={{
          title: 'Scan QR',
          header: props => <TopNavigation {...props} />,
        }}
        name="ScanQR"
        component={ScanQRBinding}
      />
      <Screen name="Auth" component={SignInBinding} />
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
            header: props => <TopNavigation {...props} presentation="modal" />,
          })}
        />
      </Group>
    </Navigator>
  );
});
