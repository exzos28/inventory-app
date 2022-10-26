import {observer} from 'mobx-react-lite';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {
  Divider,
  Icon,
  IconProps,
  TopNavigation,
  TopNavigationAction,
  TopNavigationActionProps,
} from '@ui-kitten/components';
import {StackHeaderProps} from '@react-navigation/stack/lib/typescript/src/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type HeaderProps = StackHeaderProps & {};

const BackIcon = (props: IconProps) => <Icon {...props} name="arrow-back" />;

const BackAction = (props: TopNavigationActionProps) => (
  <TopNavigationAction icon={BackIcon} {...props} />
);

export const AuthHeader = observer((props: HeaderProps) => {
  const {options, navigation} = props;
  const AccessoryLeft = useMemo(() => {
    if (navigation.canGoBack()) {
      return <BackAction onPress={navigation.goBack} />;
    }
    return undefined;
  }, [navigation]);
  const insets = useSafeAreaInsets();
  return (
    <View style={{paddingTop: insets.top}}>
      <TopNavigation
        alignment="center"
        accessoryLeft={AccessoryLeft}
        title={options.title}
      />
      <Divider />
    </View>
  );
});
