import React from 'react';
import {View, ViewProps} from 'react-native';

import {observer} from 'mobx-react-lite';

import {translateAlignItemsToStyle} from './translateAlignItemsToStyle';
import {translateJustifyContentToStyle} from './translateJustifyContentToStyle';
import {AlignItems, JustifyContent} from './types';

export type LevelerProps = ViewProps & {
  align?: AlignItems;
  justify?: JustifyContent;
};

export default observer(function Leveler({
  align,
  justify,
  style,
  ...rest
}: LevelerProps) {
  const alignItems = translateAlignItemsToStyle(align);
  const justifyContent = translateJustifyContentToStyle(justify);
  return <View style={[{alignItems, justifyContent}, style]} {...rest} />;
});
