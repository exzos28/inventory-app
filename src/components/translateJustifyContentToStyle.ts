import {JustifyContent, StyleJustifyContent} from './types';

export function translateJustifyContentToStyle(
  align?: JustifyContent,
): StyleJustifyContent | undefined {
  switch (align) {
    case JustifyContent.Center:
      return 'center';
    case JustifyContent.End:
      return 'flex-end';
    case JustifyContent.Start:
      return 'flex-start';
    case JustifyContent.Between:
      return 'space-between';
    default:
      return undefined;
  }
}
