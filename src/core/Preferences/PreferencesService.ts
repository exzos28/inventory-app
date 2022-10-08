import define from '../persistence/define';
import {PREFERENCES} from '../persistence';
import {flow, makeObservable, observable} from 'mobx';
import {Service} from '../structure';

export default class PreferencesService implements Service {
  @observable.ref private _preferences = defaultPreferences;

  constructor() {
    makeObservable(this);
  }

  get locale() {
    return this._preferences.locale;
  }

  setLocale = flow(function* (this: PreferencesService, locale: Locale) {
    const nextPreferences: PreferencesRecord = {
      ...this._preferences,
      locale,
    };
    yield setPreferences(nextPreferences);
    this._preferences = nextPreferences;
  });

  private _load = flow(function* (this: PreferencesService) {
    this._preferences = yield getPreferences();
  });

  subscribe = () => {
    this._load();
    return undefined;
  };
}

const [_getPreferences, setPreferences] =
  define<PreferencesRecord>(PREFERENCES);

interface PreferencesRecord {
  locale?: Locale;
}

export enum Locale {
  Polish = 'pl',
  English = 'en',
  German = 'de',
}

const defaultPreferences: PreferencesRecord = {};

const getPreferences = async () => {
  const preferences_ = await _getPreferences();
  return preferences_.success && preferences_.right !== null
    ? preferences_.right
    : defaultPreferences;
};
