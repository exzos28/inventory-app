import {observer} from 'mobx-react-lite';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ChangeLanguageBinding from './ChangeLanguageBinding';
import {useStrings} from '../../core';
import MenuScreenBinding from './MenuBinding';
import MenuScreenHeader from '../../screens/MenuScreen/MenuScreenHeader';
import ScanQRBinding from './ScanQRBinding';
import {Header} from '../components/Header';
import SettingsBinding from './SettingsBinding';
import FindUserBinding from './FindUserBinding';
import FindItemBinding from './FindItemBinding';
import ItemDetailsBinding, {ItemDetailsHeader} from './ItemDetailsBinding';
import CreateItemBinding from './CreateItemBinding';
import PickFieldNameBinding from './PickFieldNameBinding';
import EditItemBinding from './EditItemBinding';

export type RootParamList = {
  Menu: undefined;
  FindItem: undefined;
  ItemDetails: undefined;

  CreateItem:
    | {
        pickedValue:
          | {
              label: string;
            }
          | undefined;
      }
    | undefined;
  EditItem:
    | {
        pickedValue:
          | {
              label: string;
            }
          | undefined;
        // id: number; // TODO Pass id
      }
    | undefined;
  PickFieldName: {
    fromScreen: 'CreateItem' | 'EditItem';
  };

  FindUser: undefined;

  Account: undefined;
  Settings: undefined;
  ScanQR: undefined;
  ChangeLanguage: undefined;
};

const {Navigator, Screen, Group} = createStackNavigator<RootParamList>();

export const RootStack = observer(() => {
  const strings = useStrings();
  return (
    <Navigator
      screenOptions={{cardShadowEnabled: true}}
      initialRouteName="Menu">
      <Screen
        name="Menu"
        options={{
          header: props => <MenuScreenHeader {...props} />,
        }}
        component={MenuScreenBinding}
      />
      <Group
        screenOptions={{
          header: props => <Header {...props} />,
        }}>
        <Screen
          name="Settings"
          options={{
            title: 'Settings',
          }}
          component={SettingsBinding}
        />
        <Screen
          name="FindItem"
          options={{
            title: strings['findItemScreen.headerTitle'],
          }}
          component={FindItemBinding}
        />
        <Screen
          name="ItemDetails"
          options={{
            title: strings['itemDetailsScreen.headerTitle'],
            header: props => <ItemDetailsHeader {...props} />,
          }}
          component={ItemDetailsBinding}
        />
        <Screen
          name="CreateItem"
          options={{
            title: strings['createItemScreen.headerTitle'],
          }}
          component={CreateItemBinding}
        />
        <Screen
          name="EditItem"
          options={{
            title: strings['editItemScreen.headerTitle'],
          }}
          component={EditItemBinding}
        />
        <Screen
          name="FindUser"
          options={{
            title: 'Find user',
          }}
          component={FindUserBinding}
        />
        <Screen
          options={{
            title: 'Scan QR',
          }}
          name="ScanQR"
          component={ScanQRBinding}
        />
      </Group>
      <Group
        screenOptions={{
          presentation: 'modal',
          header: props => <Header {...props} />,
        }}>
        <Screen
          name="ChangeLanguage"
          component={ChangeLanguageBinding}
          options={{
            title: strings['changeLanguage.title'],
          }}
        />
      </Group>
      <Group
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
          cardStyle: {backgroundColor: 'transparent'},
          cardOverlayEnabled: false,
          gestureEnabled: false,
          presentation: 'transparentModal',
        }}>
        <Screen name="PickFieldName" component={PickFieldNameBinding} />
      </Group>
    </Navigator>
  );
});
