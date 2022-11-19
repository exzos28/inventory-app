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
import SelectUserToTransferBinding from './SelectUserToTransferBinding';
import {ItemId, UserId} from '../../tempTypes';
import ItemsSelectionForUserBinding from './ItemsSelectionForUserBinding';
import ConfirmItemsTransferBinding from './ConfirmItemsTransferBinding';
import SelectItemForQrMarkingBinding from './SelectItemForQrMarkingBinding';
import QrItemMarkingBinding from './QrItemMarkingBinding';
import ChangeProjectBinding from './ChangeProjectBinding';

export type RootParamList = {
  Menu: undefined;
  //
  //
  SelectUserToTransfer: undefined;
  ItemsSelectionForUser: {
    forUser: UserId;
  };
  ConfirmItemsTransfer: {
    items: ItemId[];
    forUser: UserId;
  };
  FindItem: undefined;
  //
  //
  ItemDetails: {
    id: ItemId;
  };
  CreateItem:
    | {
        pickedValue?: {
          label: string;
        };
      }
    | undefined;
  EditItem: {
    pickedValue?:
      | {
          label: string;
          id?: ItemId;
        }
      | undefined;
  };
  //
  //
  PickFieldName: {
    fromScreen: 'CreateItem' | 'EditItem';
  };
  ChangeProject: undefined;
  //
  //
  SelectItemForQrMarking: undefined;
  QrItemMarking: {
    id: ItemId;
  };
  //
  //

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
            title: strings['settingsScreen.headerTitle'],
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
            title: strings['findUserScreen.headerTitle'],
          }}
          component={FindUserBinding}
        />
        <Screen
          options={{
            title: strings['scanQrScreen.headerTitle'],
          }}
          name="ScanQR"
          component={ScanQRBinding}
        />
        <Screen
          options={{
            title: strings['selectUserToTransferScreen.headerTitle'],
          }}
          name="SelectUserToTransfer"
          component={SelectUserToTransferBinding}
        />
        <Screen
          options={{
            title: strings['itemsSelectionForUserScreen.headerTitle'],
          }}
          name="ItemsSelectionForUser"
          component={ItemsSelectionForUserBinding}
        />
        <Screen
          options={{
            title: strings['confirmItemsTransferScreen.headerTitle'],
          }}
          name="ConfirmItemsTransfer"
          component={ConfirmItemsTransferBinding}
        />

        <Screen
          options={{
            title: strings['selectItemForQrMarkingScreen.headerTitle'],
          }}
          name="SelectItemForQrMarking"
          component={SelectItemForQrMarkingBinding}
        />
        <Screen
          options={{
            title: strings['qrItemMarkingBindingScreen.headerTitle'],
          }}
          name="QrItemMarking"
          component={QrItemMarkingBinding}
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
        <Screen name="ChangeProject" component={ChangeProjectBinding} />
      </Group>
    </Navigator>
  );
});
