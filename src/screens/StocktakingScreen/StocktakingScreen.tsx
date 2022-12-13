import React from 'react';

import {observer} from 'mobx-react-lite';

import {variance} from '../../core/styling';
import {Button} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import {Bubble, Cell, Grid, Gutter} from '../../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  FindItemScene,
  FindItemSceneProps,
  RightAccessoryView,
  RightCheckAccessory,
} from '../../components/scenes/FindItemScene';
import {ItemId} from '../../core/HadesServer';
import {Item} from '../../core/ItemHelper';
import {noop} from 'lodash';
import EmptyList from '../../components/EmptyList';
import {EmptyListView} from '../../components/organisms/ItemList';
import {useStrings} from '../../core';

export type StocktakingScreenProps = Omit<
  FindItemSceneProps,
  'onCreatePress'
> & {
  getSelectedIds: () => ItemId[];
  onScanPress: () => void;
  onNextPress: () => void;
  data: Item[];
};

export default observer(function StocktakingScreen({
  getSelectedIds,
  onScanPress,
  onNextPress,
  data,
  ...rest
}: StocktakingScreenProps) {
  const items = getSelectedIds();
  const insets = useSafeAreaInsets();
  const strings = useStrings();
  return (
    <RootView>
      <FindItemScene
        {...rest}
        data={data}
        onCreatePress={noop}
        visibleCreateButton={false}
        rightAccessory={item =>
          items.includes(item.id) ? (
            <RightCheckAccessory />
          ) : (
            <RightAccessoryView />
          )
        }
        ListEmptyComponent={
          <EmptyListView>
            <EmptyList title={strings['stocktakingScreen.doesNotHaveItems']} />
          </EmptyListView>
        }
        contentContainerStyle={styles.container}
      />
      {data.length !== 0 && (
        <View style={{paddingBottom: insets.bottom}}>
          <Bubble>
            <Grid gutter={Gutter.Small}>
              <Cell>
                <Button onPress={onScanPress}>
                  {strings['stocktakingScreen.scanButton']}
                </Button>
              </Cell>
              <Cell>
                <Button onPress={onNextPress}>
                  {strings['stocktakingScreen.nextButton']}
                </Button>
              </Cell>
            </Grid>
          </Bubble>
        </View>
      )}
    </RootView>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
});

const RootView = variance(View)(() => ({
  root: {
    flex: 1,
  },
}));
