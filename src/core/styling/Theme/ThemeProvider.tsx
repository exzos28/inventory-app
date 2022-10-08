import React from 'react';
import ThemeContext from './ThemeContext';
import {Theme} from './Theme';
import {FC} from 'react';

const ThemeProvider: FC<{theme: Theme}> = ({theme, ...rest}) => (
  <ThemeContext.Provider value={theme} {...rest} />
);

export default ThemeProvider;
