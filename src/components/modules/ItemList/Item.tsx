import React from 'react';
import {IconProps, Layout, Text} from '@ui-kitten/components';
import {observer} from 'mobx-react-lite';
import {Image, StyleSheet} from 'react-native';
import RippleButton, {RippleButtonProps} from '../../RippleButton';
import {ItemType} from '../../../tempTypes';
import Bubble from '../../Bubble';
import {AlignItems, Gutter} from '../../types';
import {Url, variance} from '../../../core';
import Grid, {Cell} from '../../Grid';
import Space from '../../Space';

export type ExternalItemProps = {
  rightAccessory?: (item: ItemType) => React.ReactNode;
  onItemPress?: (item: ItemType) => void;
  onItemLongPress?: (item: ItemType) => void;
};

export type ItemProps = Exclude<RippleButtonProps, 'onPress'> &
  ExternalItemProps & {
    item: ItemType;
  };

export default observer(
  ({item, onItemLongPress, onItemPress, rightAccessory}: ItemProps) => (
    <ListItemRoot>
      <RippleButton
        enabled={onItemPress !== undefined || onItemLongPress !== undefined}
        onLongPress={() => onItemLongPress?.(item)}
        onPress={() => onItemPress?.(item)}>
        <Bubble gutter={[Gutter.Small, Gutter.Middle]}>
          <Grid>
            <Cell>
              <Grid gutter={Gutter.Small} align={AlignItems.Center}>
                <Cell flex={0}>
                  <ItemImage image={item.image} />
                </Cell>
                <Cell>
                  <Space gutter={Gutter.Tiny}>
                    <NameText category="h6">{item.name}</NameText>
                    <Text category="c1">{item.serialNumber}</Text>
                  </Space>
                </Cell>
                {rightAccessory !== undefined && (
                  <Cell flex={0}>{rightAccessory?.(item)}</Cell>
                )}
              </Grid>
            </Cell>
          </Grid>
        </Bubble>
      </RippleButton>
    </ListItemRoot>
  ),
);

const ListItemRoot = variance(Layout)(() => ({
  root: {},
}));

type ItemImageProps = IconProps & {
  image: Url;
};

const ItemImage = ({image}: ItemImageProps) => {
  return (
    <ItemImageRoot level="4">
      <Image
        resizeMode="cover"
        style={StyleSheet.absoluteFillObject}
        source={{uri: image}}
      />
    </ItemImageRoot>
  );
};

const ItemImageRoot = variance(Layout)(() => ({
  root: {
    width: 50,
    height: 50,
  },
}));

const NameText = variance(Text)(() => ({
  root: {
    fontSize: 16,
  },
}));
