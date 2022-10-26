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
} from '../../index';
import {variance} from '../../../core';
import {UserType, UserRole} from '../../../tempTypes';
import Grid from '../../Grid';

export type ExternalItemProps = {
  rightAccessory?: (item: UserType) => void;
  onItemPress?: (item: UserType) => void;
};

export type ItemProps = Exclude<RippleButtonProps, 'onPress'> &
  ExternalItemProps & {
    item: UserType;
  };

export default observer(
  ({item, rightAccessory, onItemPress, ...rest}: ItemProps) => (
    <RootLayout>
      <RippleButton
        enabled={onItemPress !== undefined}
        onPress={() => onItemPress?.(item)}
        {...rest}>
        <Bubble gutter={[Gutter.Small, Gutter.Middle]}>
          <Grid>
            <Cell>
              <Space direction={Direction.Row} align={AlignItems.Center}>
                <Space gutter={Gutter.Tiny}>
                  <Text category="h6">{item.name}</Text>
                  <Text category="c2">{translateUserRole(item.role)}</Text>
                </Space>
              </Space>
            </Cell>
            {rightAccessory?.(item)}
          </Grid>
        </Bubble>
      </RippleButton>
    </RootLayout>
  ),
);

export function translateUserRole(role: UserRole) {
  switch (role) {
    case UserRole.Owner:
      return 'Owner';
    case UserRole.Admin:
      return 'Admin';
    case UserRole.Manager:
      return 'Manager';
    case UserRole.User:
    default:
      return 'User';
  }
}

const RootLayout = variance(Layout)(() => ({
  root: {},
}));
