import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {Platform, View, ViewProps} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RNKeyboardManager from 'react-native-keyboard-manager';

export default observer(function IQKeyboardManagerFocused(props: ViewProps) {
  const navigation = useNavigation();
  useEffect(() => {
    if (Platform.OS === 'ios') {
      const unsubscribe = navigation.addListener('focus', () => {
        RNKeyboardManager.setEnable(true);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [navigation]);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const unsubscribe = navigation.addListener('blur', () => {
        RNKeyboardManager.setEnable(false);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [navigation]);

  return <View {...props} />;
});
