import {expr} from 'mobx-utils';
import useWindowDimensions from './useWindowDimensions';
import {useCallback} from 'react';

/**
 * Link: https://getbootstrap.com/docs/4.1/layout/overview/
 */

// Small devices (landscape phones, 576px and up)
export const SM_BREAKPOINT = 576;
// Medium devices (tablets, 768px and up)
export const MD_BREAKPOINT = 768;
// Large devices (desktops, 992px and up)
export const LG_BREAKPOINT = 992;
// Extra large devices (large desktops, 1200px and up)
export const XL_BREAKPOINT = 1200;

export type LiteralBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export function useBreakpoint() {
  const {width} = useWindowDimensions();
  return expr(() => translatePixelsToBreakpoint(width));
}

export function useGetDimensions() {
  const {width} = useWindowDimensions();
  return useCallback(
    (breakpoint: LiteralBreakpoint) =>
      width >= translateBreakpointToPixels(breakpoint),
    [width],
  );
}

export function useGetIsDimensions(breakpoint: LiteralBreakpoint) {
  const {width} = useWindowDimensions();
  return useCallback(() => width >= translateBreakpointToPixels(breakpoint), [
    breakpoint,
    width,
  ]);
}

export function useIsDimensions(breakpoint: LiteralBreakpoint) {
  const {width} = useWindowDimensions();
  return width >= translateBreakpointToPixels(breakpoint);
}

export function translateBreakpointToPixels(breakpoint: LiteralBreakpoint) {
  switch (breakpoint) {
    case 'sm':
      return SM_BREAKPOINT;
    case 'md':
      return MD_BREAKPOINT;
    case 'lg':
      return LG_BREAKPOINT;
    case 'xl':
      return XL_BREAKPOINT;
    case 'xs':
      return 0;
  }
}

export function translatePixelsToBreakpoint(pixels: number): LiteralBreakpoint {
  if (pixels >= XL_BREAKPOINT) {
    return 'xl';
  } else if (pixels >= LG_BREAKPOINT) {
    return 'lg';
  } else if (pixels >= MD_BREAKPOINT) {
    return 'md';
  } else if (pixels >= SM_BREAKPOINT) {
    return 'sm';
  } else {
    return 'xs';
  }
}
