import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

import {observer} from 'mobx-react-lite';

import {translateAlignItemsToStyle} from './translateAlignItemsToStyle';
import translateGutterToStyle from './translateGutterToStyle';
import {translateJustifyContentToStyle} from './translateJustifyContentToStyle';
import {
  AlignItems,
  AvailableGutter,
  Direction,
  Gutter,
  JustifyContent,
} from './types';

export type BubbleProps = {
  children: React.ReactNode | React.ReactNode[];
  gutter?: AvailableGutter;
  align?: AlignItems;
  justify?: JustifyContent;
  style?: StyleProp<ViewStyle>;
  direction?: Direction;
  wrap?: boolean;
};

export default observer(function Bubble({
  children,
  gutter = Gutter.Middle,
  align,
  justify,
  style,
  direction = Direction.Column,
  wrap = false,
}: BubbleProps) {
  const gutterStyle = translateGutterToStyle(gutter);
  const alignItems = translateAlignItemsToStyle(align);
  const justifyContent = translateJustifyContentToStyle(justify);
  const directionStyle: StyleProp<ViewStyle> =
    direction === Direction.Row ? {flexDirection: 'row'} : {};
  const wrapStyle: StyleProp<ViewStyle> = wrap ? {flexWrap: 'wrap'} : {};
  return (
    <View
      style={[
        {alignItems, justifyContent},
        gutterStyle,
        directionStyle,
        wrapStyle,
        style,
      ]}>
      {children}
    </View>
  );
});
