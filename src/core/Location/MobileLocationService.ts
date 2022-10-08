import DeepLinkingLocationSourceService from './DeepLinkingLocationSourceService';
import BatchLocationSourceService from './BatchLocationSourceService';
import HeadlessLocationImpl from './HeadlessLocationImpl';
import {LocationSource} from './LocationSource';
import {EXTERNAL, SpecialLocation} from '../SpecialLocation';
import {ErrorRepository} from '../ErrorRepository';
import {UnknownError} from '../Error';
import {batchDisposers, Service} from '../structure';
import {Either} from '../fp';
import {Url} from '../units';
import {Location} from './Location';

export default class MobileLocationService
  extends HeadlessLocationImpl
  implements Location, LocationSource, Service
{
  constructor(
    protected readonly _root: {
      readonly errorRepository: ErrorRepository;
      readonly specialLocation: SpecialLocation;
    },
  ) {
    super(_root);
  }

  async open(locator: Url): Promise<Either<void, UnknownError>> {
    if (this._root.specialLocation.parse(locator).kind === EXTERNAL) {
      return super.open(locator);
    } else {
      return this._source.open(locator);
    }
  }

  private _deepLinking = new DeepLinkingLocationSourceService();

  private _source = new BatchLocationSourceService([this._deepLinking]);

  getInitial() {
    return this._source.getInitial();
  }

  updates = this._source.updates;

  subscribe() {
    return batchDisposers(
      this._deepLinking.subscribe(),
      this._source.subscribe(),
    );
  }
}
