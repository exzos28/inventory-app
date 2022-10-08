import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {SettingsScreen} from '../../screens/SettingsScreen';
import {RootBottomTabBindingProps} from './RootBottomTabBindingProps';
import {useGoToMarketReviews} from '../../core/Market/useGoToMarket';
import {Url, useRoot} from '../../core';

export type SettingsBindingProps = RootBottomTabBindingProps<'Settings'>;

export default observer(function SettingsBinding(props: SettingsBindingProps) {
  const {navigation} = props;
  const {location} = useRoot();
  const goToChooseLanguage = useCallback(() => {
    navigation.navigate('ChangeLanguage');
  }, [navigation]);
  const goToWriteUs = useCallback(async () => {
    const url = 'mailto:oleksandr.kurinnyi.dev@gmail.com' as Url;
    await location.open(url);
  }, [location]);
  const goToReview = useGoToMarketReviews();

  return (
    <SettingsScreen
      goToChooseLanguage={goToChooseLanguage}
      goToWriteUs={goToWriteUs}
      goToRateApp={goToReview}
    />
  );
});
