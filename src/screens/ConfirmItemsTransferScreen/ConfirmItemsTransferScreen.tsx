import React from 'react';

import {observer} from 'mobx-react-lite';

import {useTheme, variance} from '../../core/styling';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet, View} from 'react-native';
import {
  AlignItems,
  Bubble,
  Gutter,
  RippleButton,
  Space,
} from '../../components';
import {ItemList, ItemListProps} from '../../components/organisms/ItemList';
import {useStrings} from '../../core';
import {Item} from '../../core/ItemHelper';
import {User} from '../../core/ProjectUsersHelper';
import {StaticRoleFormatterImpl} from '../../core/Formatter';

export type ConfirmItemsScreenProps = Exclude<
  ItemListProps,
  'rightAccessory'
> & {
  onSubmitPress: () => void;
  onItemPress: (item: Item) => void;
  user: User;
  onCreatePress: () => void;
};

const ABSOLUTE_BUTTON_HEIGHT = 85;

export default observer(function ConfirmItemsScreen({
  data,
  onSubmitPress,
  onItemPress,
  user,
  onCreatePress,
}: ConfirmItemsScreenProps) {
  const strings = useStrings();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const visibleSubmitButton = data?.length !== 0;
  const absoluteButtonHeight = visibleSubmitButton
    ? insets.bottom / 2 + ABSOLUTE_BUTTON_HEIGHT
    : insets.bottom;
  return (
    <RootLayout>
      <ItemList
        visibleCreateButton={false}
        onCreatePress={onCreatePress}
        withSearch={false}
        onItemPress={onItemPress}
        data={data}
        contentContainerStyle={{paddingBottom: absoluteButtonHeight}}
        initialNumToRender={30}
        maxToRenderPerBatch={30}
        ListFooterComponent={() => (
          <View>
            <ArrowBottomView>
              <Icon
                name="arrow-downward-outline"
                style={styles.arrow}
                fill={theme.palette['color-primary-active']}
              />
            </ArrowBottomView>
            <RippleButton onPress={() => {}}>
              <Bubble>
                <Space gutter={Gutter.Tiny} align={AlignItems.Center}>
                  <Text category="h6">{user.username}</Text>
                  <Text category="c2">
                    {StaticRoleFormatterImpl.translateUserRole(
                      user.role,
                      strings,
                    )}
                  </Text>
                </Space>
              </Bubble>
            </RippleButton>
          </View>
        )}
      />
      {data?.length !== 0 && (
        <AbsoluteButtonView style={{height: absoluteButtonHeight}}>
          <AbsoluteButtonBubble>
            <Button onPress={onSubmitPress}>
              {strings['confirmItemsTransferScreen.confirmButton']}
            </Button>
          </AbsoluteButtonBubble>
        </AbsoluteButtonView>
      )}
    </RootLayout>
  );
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  arrow: {
    width: 100,
    height: 100,
  },
});

const RootLayout = variance(Layout)(() => ({
  root: {
    flex: 1,
  },
}));

const ArrowBottomView = variance(View)(() => ({
  root: {
    alignItems: 'center',
  },
}));

const AbsoluteButtonView = variance(View)(() => ({
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

const AbsoluteButtonBubble = variance(Bubble)(() => ({
  root: {
    height: ABSOLUTE_BUTTON_HEIGHT,
  },
}));
