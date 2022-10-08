import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {Layout} from '@ui-kitten/components';
import {Locale, useRoot, variance} from '../../core';
import LanguageList from './LanguageList';

export type PickLanguageScreenProps = {
  onLanguageChange: () => void;
};

export default observer(function PickLanguageScreen(
  props: PickLanguageScreenProps,
) {
  const {onLanguageChange} = props;
  const {preferences} = useRoot();
  const onLanguagePress = useCallback(
    (locale: Locale) => {
      preferences.setLocale(locale);
      onLanguageChange();
    },
    [onLanguageChange, preferences],
  );
  return (
    <Root level="1">
      <LanguageList onLanguagePress={onLanguagePress} />
    </Root>
  );
});

const Root = variance(Layout)(() => ({
  root: {
    flex: 1,
  },
}));
