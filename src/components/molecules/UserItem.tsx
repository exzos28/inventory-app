import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {observer} from 'mobx-react-lite';
import {
  AlignItems,
  Bubble,
  Cell,
  Direction,
  Gutter,
  RippleButton,
  RippleButtonProps,
  Space,
} from '../index';
import {useStrings, variance} from '../../core';
import Grid from '../Grid';
import {translateUserRole} from '../../tempHelper';
import {User} from '../../core/ProjectUsersHelper';
import {View} from 'react-native';

export type ExternalItemProps = {
  rightAccessory?: (item: User) => React.ReactNode;
  onItemPress?: (item: User) => void;
};

export type ItemProps = Exclude<RippleButtonProps, 'onPress'> &
  ExternalItemProps & {
    item: User;
  };

export default observer(
  ({item, rightAccessory, onItemPress, ...rest}: ItemProps) => {
    const strings = useStrings();
    const content = (
      <Bubble gutter={[Gutter.Small, Gutter.Middle]}>
        <Grid>
          <Cell flex={2}>
            <Space direction={Direction.Row} align={AlignItems.Center}>
              <Space gutter={Gutter.Tiny}>
                <Text category="s1">{item.username}</Text>
                <Text category="s2">{item.email}</Text>
                <Text category="c1">
                  {translateUserRole(item.role, strings)}
                </Text>
              </Space>
            </Space>
          </Cell>
          {rightAccessory && <View>{rightAccessory?.(item)}</View>}
        </Grid>
      </Bubble>
    );
    if (onItemPress) {
      return (
        <RootLayout>
          <RippleButton onPress={() => onItemPress(item)} {...rest}>
            {content}
          </RippleButton>
        </RootLayout>
      );
    }
    return <RootLayout>{content}</RootLayout>;
  },
);

const RootLayout = variance(Layout)(() => ({
  root: {},
}));
