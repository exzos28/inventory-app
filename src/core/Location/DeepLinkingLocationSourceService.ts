import {Linking} from 'react-native';
import {LocationSource} from './LocationSource';
import {BusImpl, Disposer, Service} from '../structure';
import {Either, error, success} from '../fp';
import {Url} from '../units';

export default class DeepLinkingLocationSourceService
  implements LocationSource, Service
{
  async getInitial(): Promise<Either<Url, void>> {
    const link = await Linking.getInitialURL();
    if (link) {
      return success(link as Url);
    }
    return error(undefined);
  }

  public readonly updates = new BusImpl<Url>();

  private readonly _onLinking = (event: {url: string}) => {
    this.updates.send(event.url as Url);
  };

  subscribe() {
    const url_ = Linking.addEventListener('url', this._onLinking);
    return (() => {
      url_.remove();
    }) as Disposer;
  }
}
