import React, {PropsWithChildren} from 'react';
import {
  DefaultSectionT,
  FlatListProps,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  ScrollView,
  ScrollViewProps,
  SectionList,
  SectionListProps,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
export const EXTRA_BOTTOM_OFFSET = 15;
export const EXTRA_TOP_OFFSET = 10;

export enum SafeAreaInset {
  TOP = 'top',
  BOTTOM = 'bottom',
  ALL = 'all',
}
export type InsetsProp = SafeAreaInset | SafeAreaInset[];
export type ExtraProps = Partial<{
  top: number;
  bottom: number;
}>;
export type InsetsProps = Partial<{
  insets: InsetsProp;
  extra: ExtraProps;
}>;
export type SafeKeyboardProps = {
  safeKeyboard?: true;
} & Omit<KeyboardAvoidingViewProps, 'behavior'>;

export type BaseSafeAreaProps = InsetsProps & SafeKeyboardProps;

export type SafeAreaLayoutProps = InsetsProps & ViewProps;
export const SafeAreaLayout = ({
  insets,
  style,
  extra,
  ...rest
}: PropsWithChildren<SafeAreaLayoutProps>) => {
  const insetsStyle = useInsetsStyle(insets, extra);
  return <View style={[insetsStyle, style]} {...rest} />;
};

export type SafeAreaFlatListProps<ItemT> = BaseSafeAreaProps &
  FlatListProps<ItemT>;
export const SafeAreaFlatList = <ItemT extends any>({
  insets,
  contentContainerStyle,
  extra,
  safeKeyboard,
  keyboardVerticalOffset,
  ...rest
}: SafeAreaFlatListProps<ItemT>) => {
  const insetsStyle = useInsetsStyle(insets, extra);
  return (
    <SafeKeyboardView
      safeKeyboard={safeKeyboard}
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <FlatList
        contentContainerStyle={[
          insetsStyle,
          styles.container,
          contentContainerStyle,
        ]}
        {...rest}
      />
    </SafeKeyboardView>
  );
};

export type SafeAreaSectionListProps<
  ItemT,
  SectionT = DefaultSectionT,
> = BaseSafeAreaProps & SectionListProps<ItemT, SectionT>;
export const SafeAreaSectionList = <ItemT extends any, SectionT extends any>({
  insets,
  contentContainerStyle,
  extra,
  safeKeyboard,
  keyboardVerticalOffset,
  ...rest
}: SafeAreaSectionListProps<ItemT, SectionT>) => {
  const insetsStyle = useInsetsStyle(insets, extra);
  return (
    <SafeKeyboardView
      safeKeyboard={safeKeyboard}
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <SectionList
        contentContainerStyle={[
          insetsStyle,
          styles.container,
          contentContainerStyle,
        ]}
        {...rest}
      />
    </SafeKeyboardView>
  );
};

export type SafeAreaScrollViewProps = BaseSafeAreaProps & ScrollViewProps;
export const SafeAreaScrollView = ({
  insets,
  contentContainerStyle,
  extra,
  children,
  safeKeyboard,
  keyboardVerticalOffset,
  ...rest
}: SafeAreaScrollViewProps) => {
  const insetsStyle = useInsetsStyle(insets, extra);
  return (
    <SafeKeyboardView
      safeKeyboard={safeKeyboard}
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <ScrollView
        contentContainerStyle={[
          insetsStyle,
          styles.container,
          contentContainerStyle,
        ]}
        {...rest}>
        {children}
      </ScrollView>
    </SafeKeyboardView>
  );
};

const SafeKeyboardView = ({
  keyboardVerticalOffset,
  safeKeyboard,
  children,
}: PropsWithChildren<SafeKeyboardProps>) => {
  if (safeKeyboard) {
    return (
      <KeyboardAvoidingView
        style={styles.root}
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        {children}
      </KeyboardAvoidingView>
    );
  }
  return <View style={styles.root}>{children}</View>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
});

const useInsetsStyle = (insets?: InsetsProp, extra?: ExtraProps) => {
  const safeAreaInsets: EdgeInsets = useSafeAreaInsets();
  const top = extra?.top ?? 0;
  const bottom = extra?.bottom ?? 0;
  const toStyleProp = (inset?: SafeAreaInset): ViewStyle | undefined => {
    switch (inset) {
      case SafeAreaInset.BOTTOM:
        return {paddingBottom: safeAreaInsets.bottom + bottom};
      case SafeAreaInset.TOP:
        return {paddingTop: safeAreaInsets.top + top};
      case SafeAreaInset.ALL:
        return {
          paddingTop: safeAreaInsets.top + top,
          paddingBottom: safeAreaInsets.bottom + bottom,
        };
      default:
        return {
          paddingTop: top,
          paddingBottom: bottom,
        };
    }
  };
  return translateInsets(insets).map(toStyleProp);
};

const translateInsets = (insets?: InsetsProp) =>
  Array.isArray(insets) ? insets : [insets];
