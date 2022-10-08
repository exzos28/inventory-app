import {Color, SvgProps} from 'react-native-svg';
import React, {FC, ComponentType} from 'react';

export default (Icon: ComponentType<SvgProps>, color: Color): FC<SvgProps> =>
  props =>
    <Icon color={color} {...props} />;
