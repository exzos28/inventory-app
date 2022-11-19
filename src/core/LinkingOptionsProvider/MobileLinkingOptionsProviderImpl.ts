import {LinkingOptions, ParamListBase} from '@react-navigation/native';
import {PREFIXES} from './constant';
import {LinkingOptionsProvider} from './LinkingOptionsProvider';
import {NavigationContainer} from '../NavigationContainer';
import {SpecialLocation} from '../SpecialLocation';

// TODO implement listen and getInitial methods
export default class MobileLinkingOptionsProviderImpl
  implements LinkingOptionsProvider
{
  constructor(
    private readonly _root: {
      readonly navigationContainer: NavigationContainer;
      readonly specialLocation: SpecialLocation;
    },
  ) {}

  readonly linkingOptions: LinkingOptions<ParamListBase> = {
    prefixes: PREFIXES,
  };
}
