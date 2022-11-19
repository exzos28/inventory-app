import {Localization as ExpoLocalization} from 'expo-localization/build/Localization.types';

export interface Localization {
  readonly state: ExpoLocalization | undefined;
}
