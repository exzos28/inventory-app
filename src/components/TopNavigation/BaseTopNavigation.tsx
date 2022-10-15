import React, {useMemo} from 'react';
import {StackHeaderProps} from '@react-navigation/stack/lib/typescript/src/types';
import {observer} from 'mobx-react-lite';
import {Platform, View} from 'react-native';
import {
  Divider,
  Icon,
  IconProps,
  TopNavigation as KittenTopNavigation,
  TopNavigationAction,
  TopNavigationActionProps,
} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type BaseTopNavigationProps = Pick<
  StackHeaderProps,
  'options' | 'navigation'
> & {
  presentation?: 'modal';
};

export default observer(function BaseTopNavigation(
  props: BaseTopNavigationProps,
) {
  const {navigation, options, presentation} = props;
  const AccessoryLeft = useMemo(() => {
    if (navigation.canGoBack()) {
      return <BackAction onPress={navigation.goBack} />;
    }
    return undefined;
  }, [navigation]);
  const insets = useSafeAreaInsets();
  const top =
    presentation === 'modal' && Platform.OS === 'ios' ? undefined : insets.top;
  return (
    <View style={{paddingTop: top}}>
      <KittenTopNavigation
        alignment="center"
        accessoryLeft={AccessoryLeft}
        title={options.title}
      />
      <Divider />
    </View>
  );
});

const BackIcon = (props: IconProps) => <Icon {...props} name="arrow-back" />;

const BackAction = (props: TopNavigationActionProps) => (
  <TopNavigationAction icon={BackIcon} {...props} />
);
