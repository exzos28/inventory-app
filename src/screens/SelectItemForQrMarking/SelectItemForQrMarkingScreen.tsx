import React from 'react';
import {observer} from 'mobx-react-lite';
import {
  FindItemScene,
  FindItemSceneProps,
} from '../../components/scenes/FindItemScene';
import {useTheme, variance} from '../../core';
import {StyleSheet, View} from 'react-native';
import Leveler from '../../components/Leveler';
import {JustifyContent} from '../../components';
import {Icon} from '@ui-kitten/components';

export type SelectItemForQrMarkingScreenProps = FindItemSceneProps & {};

export default observer(function SelectItemForQrMarkingScreen(
  props: SelectItemForQrMarkingScreenProps,
) {
  return (
    <RootView>
      <FindItemScene {...props} rightAccessory={() => <RightAccessory />} />
    </RootView>
  );
});

const RightAccessory = observer(() => {
  const theme = useTheme();
  return (
    <Leveler justify={JustifyContent.Center}>
      <Icon
        name="chevron-right-outline"
        style={styles.icon}
        fill={theme.palette['color-basic-600']}
      />
    </Leveler>
  );
});

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});

const RootView = variance(View)(() => ({
  root: {
    flex: 1,
  },
}));
