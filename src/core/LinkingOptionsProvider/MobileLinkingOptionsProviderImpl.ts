import {LinkingOptions, ParamListBase} from '@react-navigation/native';
import {when} from 'mobx';
import {PREFIXES} from './constant';
import {LinkingOptionsProvider} from './LinkingOptionsProvider';
import {NavigationContainer} from '../NavigationContainer';
import {LocationSource} from '../Location';
import {SpecialLocation, UNKNOWN} from '../SpecialLocation';
import {Url} from '../units';

export default class MobileLinkingOptionsProviderImpl
  implements LinkingOptionsProvider
{
  constructor(
    private readonly _root: {
      readonly navigationContainer: NavigationContainer;
      readonly locationSource: LocationSource;
      readonly specialLocation: SpecialLocation;
    },
  ) {}

  private _filterSupported(address: Url): Url | null {
    if (this._root.specialLocation.parse(address).kind === UNKNOWN) {
      return address;
    }
    return null;
  }

  async getInitial() {
    const url = await this._root.locationSource.getInitial();
    if (!url.success) {
      return null;
    }
    return this._filterSupported(url.right);
  }

  listen(listener: (url: string) => void) {
    this._root.locationSource.updates.listen(async _address => {
      await when(() => this._root.navigationContainer.isConfigured);
      const address = this._filterSupported(_address);
      if (address !== null) {
        listener(address);
      }
    });
  }

  readonly linkingOptions: LinkingOptions<ParamListBase> = {
    prefixes: PREFIXES,
    getInitialURL: () => this.getInitial(),
    subscribe: listener => this.listen(listener),
  };
}
