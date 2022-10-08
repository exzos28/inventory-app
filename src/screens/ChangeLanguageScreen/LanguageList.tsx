import React, {useCallback} from 'react';
import {FlatListProps, StyleSheet} from 'react-native';
import LanguageItem, {ListItem} from './LanguageItem';
import {observer} from 'mobx-react-lite';
import {ReadonlyDeep} from 'type-fest';
import {BaseSafeAreaProps, SafeAreaFlatList} from '../../components';
import {Divider} from '@ui-kitten/components';
import {Locale, useRoot} from '../../core';
import {DeFlagSvg, EnFlagSvg, PlFlagSvg} from '../../assets/svg';

export type LanguageSettingsScreenListProps = BaseSafeAreaProps & {
  onLanguagePress: (locale: Locale) => void;
};

export default observer(function LanguageSettingsScreenList(
  props: LanguageSettingsScreenListProps,
) {
  const {onLanguagePress} = props;
  const {translation} = useRoot();
  const renderItem: ListProps['renderItem'] = useCallback(
    ({item}) => {
      const active = translation.locale === item.value;
      return (
        <LanguageItem
          item={item}
          onPress={() => onLanguagePress(item.value)}
          selected={active}
        />
      );
    },
    [onLanguagePress, translation.locale],
  );

  return (
    <SafeAreaFlatList
      contentContainerStyle={styles.container}
      data={LANGUAGES}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={Divider}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export type ListProps = FlatListProps<ReadonlyDeep<ListItem>>;

const keyExtractor: ListProps['keyExtractor'] = entry => entry.value;

export const LANGUAGES = [
  {
    Icon: PlFlagSvg,
    text: 'Polski',
    value: Locale.Polish,
  },
  {
    Icon: EnFlagSvg,
    text: 'English',
    value: Locale.English,
  },
  {
    Icon: DeFlagSvg,
    text: 'Deutsch',
    value: Locale.German,
  },
];
