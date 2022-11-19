import {computed} from 'mobx';
import {Locale, PreferencesService} from '../Preferences';
import {Translation} from './Translation';
import {template, TemplateExecutor} from 'lodash';
import {LocaleDict, LocaleKeys} from './LocaleStrings';
import {de, en, pl} from './dictionaries';
import {Localization} from './Localization';

export default class TranslationService implements Translation {
  constructor(
    private readonly _root: {
      readonly preferences: PreferencesService;
      readonly localization: Localization;
    },
  ) {}

  @computed get locale(): Locale {
    const {locale: preferredLocale} = this._root.preferences;
    const {locale: systemLocale} = this._root.localization.state ?? {};
    return (
      preferredLocale ??
      (systemLocale ? translateLocale(systemLocale) : Locale.English)
    );
  }

  @computed get localeTag(): LocaleTag {
    return this.locale;
  }

  @computed private get _fileStrings(): Partial<LocaleDict> {
    switch (this.locale) {
      case Locale.English:
        return en;
      case Locale.German:
        return de;
      case Locale.Polish:
        return pl;
      default:
        return en;
    }
  }

  @computed get strings(): LocaleDict {
    const fileStrings = this._fileStrings;
    const enStrings: LocaleDict = en;
    const localeEntries = Object.keys(enStrings).map(key => {
      const localeKey = key as LocaleKeys;
      if (!fileStrings[localeKey]) {
        return [localeKey, enStrings[localeKey]];
      }
      return [localeKey, fileStrings[localeKey]];
    });
    return Object.fromEntries(localeEntries);
  }

  @computed({keepAlive: true}) get templates() {
    return Object.fromEntries(
      Object.entries(this.strings).map(([key, string]) => [
        key,
        template(string, {
          interpolate: TEMPLATE_INTERPOLATE,
        }),
      ]),
    ) as Record<keyof LocaleDict, TemplateExecutor>;
  }
}

export const translateLocale = (locale: string) => {
  const _locale = locale.slice(0, 2);
  switch (_locale) {
    case 'en':
      return Locale.English;
    case 'pl':
      return Locale.Polish;
    case 'de':
      return Locale.German;
    case 'uk-US':
    case 'uk':
    case 'ru-US':
    case 'ru':
      return Locale.English;
    default:
      return Locale.English;
  }
};

export type LocaleTag = 'de' | 'en' | 'pl';

export const TEMPLATE_INTERPOLATE = /{([\s\S]+?)}/g;
