import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

import {observer} from 'mobx-react-lite';

import {translateAlignItemsToStyle} from './translateAlignItemsToStyle';
import {translateJustifyContentToStyle} from './translateJustifyContentToStyle';
import {AlignItems, Direction, Gutter, JustifyContent} from './types';

export type SpaceProps = {
  children: React.ReactNode | React.ReactNode[];
  gutter?: Gutter | number;
  align?: AlignItems;
  justify?: JustifyContent;
  style?: StyleProp<ViewStyle>;
  direction?: Direction;
  wrap?: boolean;
};

export default observer(function Space({
  children,
  gutter = Gutter.Middle,
  align,
  justify,
  style,
  direction = Direction.Column,
  wrap = false,
}: SpaceProps) {
  const elements = React.Children.toArray(children).filter(_ => !!_);
  const alignItems = translateAlignItemsToStyle(align);
  const justifyContent = translateJustifyContentToStyle(justify);
  const directionStyle: StyleProp<ViewStyle> =
    direction === Direction.Row ? {flexDirection: 'row'} : {};
  const wrapStyle: StyleProp<ViewStyle> = wrap ? {flexWrap: 'wrap'} : {};
  return (
    <View
      style={[{alignItems, justifyContent}, directionStyle, wrapStyle, style]}>
      {React.Children.map(elements, (_, index) => {
        const isLast = index + 1 === elements.length;
        const offsetStyle =
          direction === Direction.Row
            ? {marginRight: gutter}
            : {marginBottom: gutter};
        const rowWrapStyle =
          wrap && direction === Direction.Row ? {marginBottom: gutter} : {};
        const elementStyle = isLast ? {} : offsetStyle;
        return (
          <View key={index} style={[elementStyle, rowWrapStyle]}>
            {_}
          </View>
        );
      })}
    </View>
  );
});
