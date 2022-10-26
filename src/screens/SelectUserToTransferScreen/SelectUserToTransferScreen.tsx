import React from 'react';

import {observer} from 'mobx-react-lite';

import {useTheme, variance} from '../../core/styling';
import {Icon, Layout} from '@ui-kitten/components';
import {UserList, UserListProps} from '../../components/modules/UserList';
import {StyleSheet} from 'react-native';
import Leveler from '../../components/Leveler';
import {JustifyContent} from '../../components';
import {NavigationIQKeyboardManager} from '../../Navigation/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type SelectUserToTransferScreenProps = Exclude<
  UserListProps,
  'rightAccessory'
> & {};

export default observer(function SelectUserToTransferScreen({
  onChangeText,
  searchValue,
  data,
  onItemPress,
}: SelectUserToTransferScreenProps) {
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom;
  return (
    <RootNavigationIQKeyboardManager>
      <RootLayout>
        <UserList
          onChangeText={onChangeText}
          searchValue={searchValue}
          onItemPress={onItemPress}
          data={data}
          rightAccessory={() => <RightAccessory />}
          contentContainerStyle={{paddingBottom}}
          initialNumToRender={30}
          maxToRenderPerBatch={30}
        />
      </RootLayout>
    </RootNavigationIQKeyboardManager>
  );
});

const RightAccessory = observer(() => {
  const theme = useTheme();
  return (
    <Leveler justify={JustifyContent.Center}>
      <Icon
        name="chevron-right-outline"
        style={styles.icon}
        fill={theme.palette['color-basic-600']}
      />
    </Leveler>
  );
});

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});

const RootNavigationIQKeyboardManager = variance(NavigationIQKeyboardManager)(
  () => ({
    root: {
      flex: 1,
    },
  }),
);

const RootLayout = variance(Layout)(() => ({
  root: {
    flex: 1,
  },
}));
