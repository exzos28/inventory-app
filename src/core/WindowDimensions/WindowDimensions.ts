import {ScaledSize} from 'react-native';

import {Bus} from '../structure';

export interface WindowDimensions {
  readonly updates: Bus<WindowDimensionsUpdatesListener>;
}

export type Dimensions = {window: ScaledSize; screen: ScaledSize};

export type WindowDimensionsUpdatesListener = (status: Dimensions) => void;
