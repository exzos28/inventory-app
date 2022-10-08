import {Opaque} from 'type-fest';
import {Url} from '../units';

/**
 * @deprecated use url
 */
export type PostUrl = Url;

/**
 * @deprecated use url
 */
export type PostImageUrl = Url;

export const ANNOUNCEMENT_ID = Symbol();
export type AnnouncementId = Opaque<number, typeof ANNOUNCEMENT_ID>;

export const ACTION_ID = Symbol();
export type ActionId = Opaque<number, typeof ACTION_ID>;
