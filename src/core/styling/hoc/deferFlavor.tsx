import React, {forwardRef} from 'react';
import {Theme} from '../Theme';
import useTheme from '../Theme/useTheme';
import {StyleProp} from 'react-native';
import memoize, {MemoCache} from '../util/memoize';
import {StyleType} from './StyleType';

export default <ComponentType extends Stylable>(
    config?: FlavorConfig<ComponentType>,
  ) =>
  <
    StyleEnumeration extends Record<
      keyof StyleEnumeration,
      StyleType<ComponentType>
    >,
    OverriddenProps extends Partial<React.ComponentProps<ComponentType>> = {},
  >(
    _enumerateStyles: (theme: Theme) => StyleEnumeration,
    _overrideProps?: (
      theme: Theme,
      styles: StyleEnumeration,
    ) => OverriddenProps,
  ) =>
  <PropsExtension extends {} = {}>(
    pickStyles: (
      styles: StyleEnumeration,
      props: React.ComponentProps<ComponentType> & PropsExtension,
      theme: Theme,
    ) => StyleProp<StyleType<ComponentType>>,
  ) =>
  (Component: ComponentType) => {
    const enumerateStyles = memoize(
      _enumerateStyles,
      config?.styleCache as any as MemoCache<Theme, StyleEnumeration>,
    );
    const overrideProps =
      _overrideProps && memoize(_overrideProps, config?.propsCache);
    return forwardRef<
      React.ElementRef<ComponentType>,
      React.PropsWithChildren<
        Override<OverriddenProps, React.ComponentProps<ComponentType>> &
          PropsExtension
      >
    >((props, ref) => {
      const theme = useTheme();
      const styles = enumerateStyles(theme);
      const overriddenProps = overrideProps?.(theme, styles) ?? {};
      const _props = {
        ...overriddenProps,
        ...props,
      } as React.ComponentProps<ComponentType> & PropsExtension;
      const style = pickStyles(styles, _props, theme);
      return React.createElement(Component, {
        ..._props,
        ref,
        style: [style, _props.style],
      });
    });
  };

export type Override<
  Base extends Partial<Source>,
  Source extends object,
> = Partial<Pick<Source, Extract<keyof Base, keyof Source>>> &
  Pick<Source, Exclude<keyof Source, keyof Base>>;

export type Stylable = React.ComponentType<any>;

export interface FlavorConfig<ComponentType extends Stylable> {
  styleCache?: MemoCache<Theme, Record<keyof any, StyleType<ComponentType>>>;
  propsCache?: MemoCache<Theme, Partial<React.ComponentProps<ComponentType>>>;
}
