import React from 'react';

import {observer} from 'mobx-react-lite';

import {variance} from '../../core/styling';
import {
  FindItemScene,
  FindItemSceneProps,
  RightArrowAccessory,
} from '../../components/scenes/FindItemScene';
import {Item} from '../../core/ItemHelper';
import {noop} from 'lodash';
import {StyleSheet, View} from 'react-native';
import {Button, Divider, Layout, Text} from '@ui-kitten/components';
import {
  AlignItems,
  Bubble,
  Gutter,
  JustifyContent,
  Space,
} from '../../components';

export type StocktakingResultScreenProps = Omit<
  FindItemSceneProps,
  'onCreatePress'
> & {
  data: Item[];
  onGoToMenuPress: () => void;
};

// TODO l10n
export default observer(function StocktakingResultScreen({
  data,
  ...rest
}: StocktakingResultScreenProps) {
  const isGood = data.length === 0;
  const content = isGood ? (
    <Bubble
      style={styles.content}
      align={AlignItems.Center}
      justify={JustifyContent.Center}>
      <Space gutter={Gutter.Large}>
        <Space gutter={Gutter.Tiny} align={AlignItems.Center}>
          <Text category="h5">✨</Text>
          <Text category="h5">All items have been found. </Text>
          <Text category="h5">✨✨</Text>
        </Space>
        <Button>Go to menu</Button>
      </Space>
    </Bubble>
  ) : (
    <FindItemScene
      {...rest}
      data={data}
      onCreatePress={noop}
      visibleCreateButton={false}
      rightAccessory={() => <RightArrowAccessory />}
      ListHeaderComponent={
        <View>
          <Layout>
            <Bubble>
              <Text category="h6">Not found next items:</Text>
            </Bubble>
          </Layout>
          <Divider />
        </View>
      }
    />
  );
  return <RootView>{content}</RootView>;
});

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

const RootView = variance(View)(() => ({
  root: {
    flex: 1,
  },
}));
