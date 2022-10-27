import React from 'react';

import {observer} from 'mobx-react-lite';

import {useTheme} from '../../core/styling';
import {Icon} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import Leveler from '../../components/Leveler';
import {JustifyContent} from '../../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  FindUserScene,
  FindUserSceneProps,
} from '../../components/scenes/FindUserScene';

export type SelectUserToTransferScreenProps = FindUserSceneProps & {};

export default observer(function SelectUserToTransferScreen(
  props: SelectUserToTransferScreenProps,
) {
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom;
  return (
    <FindUserScene
      {...props}
      rightAccessory={() => <RightAccessory />}
      contentContainerStyle={{paddingBottom}}
      initialNumToRender={30}
      maxToRenderPerBatch={30}
    />
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
