import {Opaque} from 'type-fest';

export const PROJECT_ID = Symbol.for('Project id');
export type ProjectId = Opaque<string, typeof PROJECT_ID>;
