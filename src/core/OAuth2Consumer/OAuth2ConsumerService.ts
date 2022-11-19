import {AuthHelper} from '../Auth';
import {AppleOAuth2Provider, SUCCESS} from '../OAuth2Provider';
import {Service} from '../structure';

export default class OAuth2ConsumerService implements Service {
  constructor(
    private readonly _root: {
      readonly appleOAuth2Provider: AppleOAuth2Provider;
      readonly authHelper: AuthHelper;
    },
  ) {}

  subscribe() {
    return this._root.appleOAuth2Provider.outcome.listen(SUCCESS, async _ => {
      await this._root.authHelper.signInByOAuth2({
        provider: 'apple',
        token: _.idToken,
      });
    });
  }
}
