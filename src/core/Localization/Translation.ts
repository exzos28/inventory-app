import {Locale} from '../Preferences';
import {LocaleTag} from './TranslationService';
import {TemplateExecutor} from 'lodash';
import {ReadonlyDeep} from 'type-fest';
import {LocaleDict} from './LocaleStrings';

export interface Translation {
  readonly locale: Locale;
  readonly localeTag: LocaleTag;
  readonly strings: ReadonlyDeep<LocaleDict>;
  readonly templates: ReadonlyDeep<Record<keyof LocaleDict, TemplateExecutor>>;
}
