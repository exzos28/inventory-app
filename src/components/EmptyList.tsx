import React from 'react';
import {observer} from 'mobx-react-lite';
import {Text} from '@ui-kitten/components';
import Bubble from './Bubble';
import Leveler from './Leveler';
import {AlignItems, JustifyContent} from './types';
import {ViewProps} from 'react-native';
import Space from './Space';
import {useStrings} from '../core';

export type EmptyListProps = ViewProps & {
  title?: string;
};

export default observer(function EmptyList({children, title}: EmptyListProps) {
  const strings = useStrings();
  const text = title === undefined ? strings['common.emptyList'] : title;
  return (
    <Bubble>
      <Space>
        <Leveler align={AlignItems.Center} justify={JustifyContent.Center}>
          <Text category="h5">{text}</Text>
        </Leveler>
        {children}
      </Space>
    </Bubble>
  );
});
