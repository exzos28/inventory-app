import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {ChangeLanguageScreen} from '../../../screens/ChangeLanguageScreen';
import {RootStackBindingProps} from '../RootStackBindingProps';

export type ChangeLanguageBindingProps =
  RootStackBindingProps<'ChangeLanguage'>;

export default observer(function ChangeLanguageBinding(
  props: ChangeLanguageBindingProps,
) {
  const {navigation} = props;
  const onLanguageChange = useCallback(() => {
    navigation.canGoBack() && navigation.goBack();
  }, [navigation]);
  return <ChangeLanguageScreen onLanguageChange={onLanguageChange} />;
});
