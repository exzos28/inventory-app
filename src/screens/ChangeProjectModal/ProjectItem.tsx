import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {observer} from 'mobx-react-lite';
import {
  AlignItems,
  Bubble,
  Cell,
  Direction,
  Grid,
  Gutter,
  RippleButton,
  RippleButtonProps,
  Space,
} from '../../components';
import {variance} from '../../core';
import {ProjectResponse} from '../../core/ProjectRestClient';

export type ExternalProjectItemProps = {
  rightAccessory?: (item: ProjectResponse) => void;
  onItemPress?: (item: ProjectResponse) => void;
};

export const PROJECT_ITEM_HEIGHT = 55;

export type ProjectItemProps = Exclude<RippleButtonProps, 'onPress'> &
  ExternalProjectItemProps & {
    item: ProjectResponse;
  };

export default observer(function ProjectItem({
  item,
  rightAccessory,
  onItemPress,
  ...rest
}: ProjectItemProps) {
  return (
    <RootLayout>
      <RippleButton
        enabled={onItemPress !== undefined}
        onPress={() => onItemPress?.(item)}
        {...rest}>
        <Bubble gutter={Gutter.Middle}>
          <Grid>
            <Cell>
              <Space direction={Direction.Row} align={AlignItems.Center}>
                <Space gutter={Gutter.Tiny}>
                  <Text category="h6">{item.name}</Text>
                </Space>
              </Space>
            </Cell>
            {rightAccessory?.(item)}
          </Grid>
        </Bubble>
      </RippleButton>
    </RootLayout>
  );
});

const RootLayout = variance(Layout)(() => ({
  root: {
    height: PROJECT_ITEM_HEIGHT,
  },
}));
