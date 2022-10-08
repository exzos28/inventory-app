import {en} from './dictionaries';

export type LocaleKeys = keyof typeof en;
export type LocaleDict = Record<LocaleKeys, string>;
