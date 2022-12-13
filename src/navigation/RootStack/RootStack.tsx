import {observer} from 'mobx-react-lite';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ChangeLanguageBinding from './bindings/ChangeLanguageBinding';
import {useStrings} from '../../core';
import MenuScreenBinding from './bindings/MenuBinding';
import MenuScreenHeader from '../../screens/MenuScreen/MenuScreenHeader';
import ScanQRBinding from './bindings/ScanQRBinding';
import {Header} from '../components/Header';
import SettingsBinding from './bindings/SettingsBinding';
import FindUserBinding from './bindings/FindUserBinding';
import FindItemBinding from './bindings/FindItemBinding';
import ItemDetailsBinding, {
  ItemDetailsHeader,
} from './bindings/ItemDetailsBinding';
import CreateItemBinding from './bindings/CreateItemBinding';
import PickFieldNameBinding from './bindings/PickFieldNameBinding';
import EditItemBinding from './bindings/EditItemBinding';
import SelectUserToTransferBinding from './bindings/SelectUserToTransferBinding';
import SelectItemsForTransferBinding from './bindings/SelectItemsForTransferBinding';
import ConfirmItemsTransferBinding from './bindings/ConfirmItemsTransferBinding';
import SelectItemForQrMarkingBinding from './bindings/SelectItemForQrMarkingBinding';
import QrItemMarkingBinding from './bindings/QrItemMarkingBinding';
import ChangeProjectBinding from './bindings/ChangeProjectBinding';
import CreateProjectBinding from './bindings/CreateProjectBinding';
import UnknownErrorBinding from './bindings/UnknownErrorBinding';
import {ItemId, UserId} from '../../core/HadesServer';
import InviteUserToProjectBinding from './bindings/InviteUserToProjectBinding';
import SelectUserToStocktakingBinding from './bindings/SelectUserToStocktakingBinding';
import {StocktakingBinding} from './bindings/StocktakingBinding';
import ScanQRForStocktakingBinding from './bindings/ScanQRForStocktakingBinding';
import {StocktakingResultBinding} from './bindings/StocktakingResultBinding';

export type RootParamList = {
  Menu: undefined;
  //
  //
  SelectUserToTransfer: undefined;
  SelectItemsForTransfer: {
    forUser: UserId;
  };
  ConfirmItemsTransfer: {
    items: ItemId[];
    forUser: UserId;
  };
  //
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
    id: ItemId;
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
  CreateProject: undefined;
  //

  //
  UnknownError:
    | {
        raw?: unknown;
        description?: string;
      }
    | undefined;
  //

  //
  SelectItemForQrMarking: undefined;
  QrItemMarking: {
    id: ItemId;
  };
  //

  InviteUserToProject: undefined;
  //

  FindUser: undefined;
  SelectUserToStocktaking: undefined;
  Stocktaking: {
    userId?: UserId;
    scannedValue?: {
      itemId: ItemId;
    };
  };
  StocktakingResult: {
    userId: UserId;
    items: ItemId[];
  };
  ScanQRForStocktaking: undefined;

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
          name="SelectItemsForTransfer"
          component={SelectItemsForTransferBinding}
        />
        <Screen
          options={{
            title: strings['confirmItemsTransferScreen.headerTitle'],
          }}
          name="ConfirmItemsTransfer"
          component={ConfirmItemsTransferBinding}
        />
        <Screen
          options={{title: strings['createProjectScreen.headerTitle']}}
          name="CreateProject"
          component={CreateProjectBinding}
        />
        <Screen
          name="InviteUserToProject"
          component={InviteUserToProjectBinding}
        />
        <Screen
          name="SelectUserToStocktaking"
          component={SelectUserToStocktakingBinding}
        />
        <Screen
          options={{title: strings['stocktakingScreen.headerTitle']}}
          name="Stocktaking"
          component={StocktakingBinding}
        />
        <Screen
          name="ScanQRForStocktaking"
          component={ScanQRForStocktakingBinding}
        />
        <Screen name="StocktakingResult" component={StocktakingResultBinding} />

        <Screen name="UnknownError" component={UnknownErrorBinding} />

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
