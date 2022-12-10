import {BaseErrorBody} from './BaseError';

export const PROJECT_NOT_SELECTED = Symbol.for('Project not selected');
export type ProjectNotSelected = {
  kind: typeof PROJECT_NOT_SELECTED;
} & BaseErrorBody;

export type ProjectError = ProjectNotSelected;
