import React, {useMemo} from 'react';
import {observer} from 'mobx-react-lite';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Divider,
  Icon,
  IconProps,
  Layout,
  TopNavigation,
  Text,
  TextProps,
} from '@ui-kitten/components';
import {Platform, StyleSheet, View} from 'react-native';
import {getHeaderTitle} from '@react-navigation/elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AccountBinding from './AccountBinding';
import SettingsBinding from './SettingsBinding';
import {useStrings, useStyles} from '../../core';
import {NavigationState, PartialState} from '@react-navigation/native';

const {Navigator, Screen} = createBottomTabNavigator<RootBottomTabParamList>();

export type RootBottomTabParamList = {
  Account:
    | {onOpen: PartialState<NavigationState> | NavigationState}
    | undefined;
  Settings: undefined;
};

export type TabNavigatorProps = {
  goToAuth: () => void;
};

export default observer(function RootTabNavigator() {
  const insets = useSafeAreaInsets();
  const strings = useStrings();
  return (
    <Navigator
      initialRouteName="Account"
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{
        header: ({options}) => (
          <Layout
            level="1"
            style={{
              paddingTop: insets.top,
            }}>
            <TopNavigation
              title={getHeaderTitle(options, '')}
              style={{backgroundColor: 'transparent'}}
              alignment="center"
            />
            <Divider />
          </Layout>
        ),
      }}>
      <Screen
        name="Account"
        options={{title: strings['account.headerTitle']}}
        component={AccountBinding}
      />
      <Screen
        name="Settings"
        options={{
          title: strings['settings.headerTitle'],
          header: ({options}) => (
            <View>
              <TopNavigation
                title={getHeaderTitle(options, '')}
                style={{paddingTop: insets.top}}
                alignment="center"
              />
              <Divider />
            </View>
          ),
        }}
        component={SettingsBinding}
      />
    </Navigator>
  );
});

const BottomTabBar = observer(
  ({navigation, state, insets}: BottomTabBarProps) => {
    const strings = useStrings();
    const bottom = Platform.OS === 'ios' ? insets.bottom / 2 : insets.bottom;
    return (
      <Layout level="1" style={{paddingBottom: bottom}}>
        <BottomNavigation
          indicatorStyle={{height: 1}}
          style={{backgroundColor: 'transparent'}}
          selectedIndex={state.index}
          onSelect={index => navigation.navigate(state.routeNames[index])}>
          <BottomNavigationTab
            icon={renderPersonIcon}
            title={props => (
              <TabTitle {...props}>{strings['bottomTab.account']}</TabTitle>
            )}
          />
          <BottomNavigationTab
            icon={renderSettingsIcon}
            title={props => (
              <TabTitle {...props}>{strings['bottomTab.settings']}</TabTitle>
            )}
          />
        </BottomNavigation>
      </Layout>
    );
  },
);

const TabTitle = observer((props: TextProps) => {
  const {style, ...rest} = props;
  const styles = useStyles(() => ({
    root: {
      fontSize: 11,
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
  }));
  const style_ = useMemo(
    () => StyleSheet.flatten([style, styles.root]),
    [style, styles],
  );

  return (
    <Text
      adjustsFontSizeToFit
      numberOfLines={1}
      {...rest}
      style={[styles.root, style_]}
    />
  );
});

export const renderPersonIcon = (props: IconProps) => (
  <Icon name="person-outline" {...props} />
);
export const renderSettingsIcon = (props: IconProps) => (
  <Icon name="settings-outline" {...props} />
);
