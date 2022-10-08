import React from 'react';
import {StyleProp} from 'react-native';

export type StyleType<
  ComponentType extends React.ComponentType<any>,
  StylePropKey extends keyof React.ComponentProps<ComponentType> = 'style',
> = React.ComponentProps<ComponentType>[StylePropKey] extends StyleProp<infer S>
  ? S
  : never;
