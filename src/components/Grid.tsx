import React, {useMemo} from 'react';
import {View, ViewProps} from 'react-native';

import {observer} from 'mobx-react-lite';

import {translateAlignItemsToStyle} from './translateAlignItemsToStyle';
import {translateJustifyContentToStyle} from './translateJustifyContentToStyle';
import {AlignItems, Direction, Gutter, JustifyContent} from './types';
import {createNullableContext, useForcedContext} from '../core/context';

export type GridProps = ViewProps & {
  direction?: Direction;
  align?: AlignItems;
  justify?: JustifyContent;
  gutter?: Gutter;
};

export default observer(function Grid({
  direction = Direction.Row,
  style,
  align,
  justify,
  gutter = 0,
  ...rest
}: GridProps) {
  const alignItems = translateAlignItemsToStyle(align);
  const justifyContent = translateJustifyContentToStyle(justify);
  const isColumn = direction === Direction.Column;
  const flexDirection = isColumn ? 'column' : 'row';
  const flexWrap = isColumn ? 'nowrap' : 'wrap';
  const gutterStyle = isColumn
    ? {marginVertical: -gutter}
    : {marginHorizontal: -gutter};
  return (
    <GridContext.Provider value={{gutter, isColumn}}>
      <View
        style={[
          {flexDirection, flexWrap, alignItems, justifyContent},
          gutterStyle,
          style,
        ]}
        {...rest}
      />
    </GridContext.Provider>
  );
});

const GridContext = createNullableContext<{
  gutter: number;
  isColumn: boolean;
}>();

export type CellProps = ViewProps & {
  flex?: number;
  fr?: number; // 1 - 24
  align?: AlignItems;
  justify?: JustifyContent;
};

export const Cell = observer(
  ({flex = 1, fr, style, align, justify, ...rest}: CellProps) => {
    const {gutter, isColumn} = useForcedContext(GridContext);
    const flexBasis = useMemo(() => {
      if (!fr) {
        return undefined;
      }
      return (fr / 24) * 100 + '%';
    }, [fr]);
    const alignItems = translateAlignItemsToStyle(align);
    const justifyContent = translateJustifyContentToStyle(justify);
    const gutterStyle = isColumn
      ? {paddingVertical: gutter}
      : {paddingHorizontal: gutter};
    return (
      <View
        style={[
          {flex, alignItems, justifyContent},
          gutterStyle,
          {flexBasis},
          style,
        ]}
        {...rest}
      />
    );
  },
);
