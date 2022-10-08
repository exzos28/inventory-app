declare module '*.png' {
  const IMAGE_ID: number;
  export default IMAGE_ID;
}

declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}
