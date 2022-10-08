import {ScaledSize} from 'react-native';
import {Bus} from '../structure';

export interface WindowDimensions {
  readonly updates: Bus<Dimensions>;
}

export type Dimensions = {window: ScaledSize; screen: ScaledSize};
