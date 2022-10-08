import {LocationSource} from './LocationSource';
import {batchDisposers, BusImpl, Service} from '../structure';
import {Either, error, success} from '../fp';
import {Url} from '../units';

export default class BatchLocationSourceService
  implements LocationSource, Service
{
  constructor(private readonly _sources: LocationSource[]) {}

  async getInitial(): Promise<Either<Url, void>> {
    for (const source of this._sources) {
      const result = await source.getInitial();
      if (result.success) {
        return result;
      }
    }
    return error(undefined);
  }

  public readonly updates = new BusImpl<Url>();

  async open(locator: Url): Promise<Either<void, never>> {
    this.updates.send(locator);
    return success();
  }

  subscribe() {
    return batchDisposers.apply(
      this,
      this._sources.map(source =>
        source.updates.listen(_ => this.updates.send(_)),
      ),
    );
  }
}
