import React from 'react';
import {observer} from 'mobx-react-lite';
import {Text} from '@ui-kitten/components';
import Bubble from './Bubble';
import Leveler from './Leveler';
import {AlignItems, JustifyContent} from './types';
import {ViewProps} from 'react-native';
import Space from './Space';

export type EmptyListProps = ViewProps & {
  title?: string;
};

// TODO l10n
export default observer(function EmptyList({children, title}: EmptyListProps) {
  const text = title === undefined ? 'Empty list' : title;
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
