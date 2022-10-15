import {AlignItems, StyleAlignItems} from './types';

export function translateAlignItemsToStyle(
  align?: AlignItems,
): StyleAlignItems | undefined {
  switch (align) {
    case AlignItems.Center:
      return 'center';
    case AlignItems.End:
      return 'flex-end';
    case AlignItems.Start:
      return 'flex-start';
    case AlignItems.Baseline:
      return 'baseline';
    default:
      return undefined;
  }
}
