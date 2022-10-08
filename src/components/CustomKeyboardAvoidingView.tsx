import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAvoidingView, Platform, ViewProps} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';

export default function CustomKeyboardAvoidingView({
  children,
  style,
}: ViewProps) {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  return (
    <KeyboardAvoidingView
      style={[style, {marginBottom: insets.bottom}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={true}
      keyboardVerticalOffset={headerHeight}>
      {children}
    </KeyboardAvoidingView>
  );
}
