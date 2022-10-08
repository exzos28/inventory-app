import React, {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import {StyleProp} from 'react-native';
import {Theme} from '../Theme';
import {StyleType} from './StyleType';
import deferFlavor, {FlavorConfig, Override, Stylable} from './deferFlavor';
import {isValidElementType} from 'react-is';

function flavor<ComponentType extends Stylable>(
  config?: FlavorConfig<ComponentType>,
): <
  StyleEnumeration extends Record<
    keyof StyleEnumeration,
    StyleType<ComponentType>
  >,
  OverriddenProps extends Partial<React.ComponentProps<ComponentType>> = {},
>(
  _enumerateStyles: (theme: Theme) => StyleEnumeration,
  _overrideProps?: (theme: Theme, styles: StyleEnumeration) => OverriddenProps,
) => <PropsExtension extends {} = {}>(
  pickStyles: (
    styles: StyleEnumeration,
    props: React.ComponentProps<ComponentType> & PropsExtension,
    theme: Theme,
  ) => StyleProp<StyleType<ComponentType>>,
) => (
  Component: ComponentType,
) => FlavoredComponent<ComponentType, OverriddenProps, PropsExtension>;
function flavor<ComponentType extends Stylable>(
  Component: ComponentType,
  config?: FlavorConfig<ComponentType>,
): <
  StyleEnumeration extends Record<
    keyof StyleEnumeration,
    StyleType<ComponentType>
  >,
  OverriddenProps extends Partial<React.ComponentProps<ComponentType>> = {},
>(
  _enumerateStyles: (theme: Theme) => StyleEnumeration,
  _overrideProps?: (theme: Theme, styles: StyleEnumeration) => OverriddenProps,
) => <PropsExtension extends {} = {}>(
  pickStyles: (
    styles: StyleEnumeration,
    props: React.ComponentProps<ComponentType> & PropsExtension,
    theme: Theme,
  ) => StyleProp<StyleType<ComponentType>>,
) => FlavoredComponent<ComponentType, OverriddenProps, PropsExtension>;
function flavor<ComponentType extends Stylable>(
  configOrComponent?: FlavorConfig<ComponentType> | ComponentType,
  config?: FlavorConfig<ComponentType>,
) {
  return <
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
    ):
      | FlavoredComponent<ComponentType, OverriddenProps, PropsExtension>
      | ((
          Component: ComponentType,
        ) => FlavoredComponent<
          ComponentType,
          OverriddenProps,
          PropsExtension
        >) =>
      isComponent(configOrComponent)
        ? deferFlavor(config)(_enumerateStyles, _overrideProps)(pickStyles)(
            configOrComponent,
          )
        : deferFlavor(
            configOrComponent as FlavorConfig<ComponentType> | undefined,
          )(
            _enumerateStyles,
            _overrideProps,
          )(pickStyles);
}

export default flavor;

export type FlavoredComponent<
  ComponentType extends Stylable,
  OverriddenProps extends Partial<React.ComponentProps<ComponentType>>,
  PropsExtension extends {},
> = ForwardRefExoticComponent<
  PropsWithoutRef<
    React.PropsWithChildren<
      Override<OverriddenProps, React.ComponentProps<ComponentType>> &
        PropsExtension
    >
  > &
    RefAttributes<React.ElementRef<ComponentType>>
>;

export const isComponent = <ComponentType extends Stylable>(
  configOrComponent?: FlavorConfig<ComponentType> | ComponentType,
): configOrComponent is ComponentType => isValidElementType(configOrComponent);
