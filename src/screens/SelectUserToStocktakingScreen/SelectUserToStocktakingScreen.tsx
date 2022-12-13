import React from 'react';

import {observer} from 'mobx-react-lite';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  FindUserScene,
  FindUserSceneProps,
  RightArrowAccessory,
} from '../../components/scenes/FindUserScene';

export type SelectUserToStocktakingScreenProps = FindUserSceneProps & {};

export default observer(function SelectUserToStocktakingScreen(
  props: SelectUserToStocktakingScreenProps,
) {
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom;
  return (
    <FindUserScene
      {...props}
      rightAccessory={() => <RightArrowAccessory />}
      contentContainerStyle={{paddingBottom}}
      initialNumToRender={30}
      maxToRenderPerBatch={30}
    />
  );
});
