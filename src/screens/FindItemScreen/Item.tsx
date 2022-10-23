import React from 'react';
import {IconProps, Layout, Text} from '@ui-kitten/components';
import {observer} from 'mobx-react-lite';
import {Item} from '../../tempTypes';
import {Url, variance} from '../../core';
import {Image, StyleSheet} from 'react-native';
import {
  AlignItems,
  Bubble,
  Direction,
  Gutter,
  RippleButton,
  RippleButtonProps,
  Space,
} from '../../components';

export type ItemProps = RippleButtonProps & {
  item: Item;
};

export default observer(({item, ...rest}: ItemProps) => (
  <ListItemRoot>
    <RippleButton {...rest}>
      <Bubble gutter={[Gutter.Small, Gutter.Middle]}>
        <Space direction={Direction.Row} align={AlignItems.Center}>
          <ItemImage image={item.image} />
          <Space gutter={Gutter.Tiny}>
            <Text category="h6">{item.name}</Text>
            <Text category="c1">{item.serialNumber}</Text>
          </Space>
        </Space>
      </Bubble>
    </RippleButton>
  </ListItemRoot>
));

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
    borderRadius: 50 / 2,
    overflow: 'hidden',
  },
}));
