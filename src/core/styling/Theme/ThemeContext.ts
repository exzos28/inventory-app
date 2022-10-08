import {createContext} from 'react';
import {Theme} from './Theme';
import ThemeImpl from './ThemeImpl';
import {Dimensions} from 'react-native';
import lightPalette from './lightPalette';

export default createContext<Theme>(
  new ThemeImpl(
    lightPalette,
    Dimensions.get('window'),
    Dimensions.get('screen'),
  ),
);
