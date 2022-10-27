import React, {useMemo} from 'react';
import {StackHeaderProps} from '@react-navigation/stack/lib/typescript/src/types';
import {observer} from 'mobx-react-lite';
import {Platform, View} from 'react-native';
import {
  Divider,
  Icon,
  IconProps,
  TopNavigation,
  TopNavigationAction,
  TopNavigationActionProps,
  TopNavigationProps,
} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack/src/types';

export type HeaderProps<N = StackNavigationProp<ParamListBase>> =
  TopNavigationProps &
    Pick<StackHeaderProps, 'options'> & {
      navigation: N;
    };

export default observer(function Header({
  navigation,
  options,
  ...rest
}: HeaderProps) {
  const AccessoryLeft = useMemo(() => {
    if (navigation.canGoBack()) {
      return <BackAction onPress={navigation.goBack} />;
    }
    return undefined;
  }, [navigation]);
  const insets = useSafeAreaInsets();
  const paddingTop =
    options.presentation === 'modal' && Platform.OS === 'ios'
      ? undefined
      : insets.top;
  return (
    <View style={{paddingTop}}>
      <TopNavigation
        alignment="center"
        accessoryLeft={AccessoryLeft}
        title={options.title}
        {...rest}
      />
      <Divider />
    </View>
  );
});

const BackIcon = (props: IconProps) => <Icon {...props} name="arrow-back" />;

const BackAction = (props: TopNavigationActionProps) => (
  <TopNavigationAction icon={BackIcon} {...props} />
);
