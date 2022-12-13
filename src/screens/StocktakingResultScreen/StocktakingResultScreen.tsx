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
import {useStrings} from '../../core';

export type StocktakingResultScreenProps = Omit<
  FindItemSceneProps,
  'onCreatePress'
> & {
  data: Item[];
  onGoToMenuPress: () => void;
};

export default observer(function StocktakingResultScreen({
  data,
  ...rest
}: StocktakingResultScreenProps) {
  const isGood = data.length === 0;
  const strings = useStrings();
  const content = isGood ? (
    <Bubble
      style={styles.content}
      align={AlignItems.Center}
      justify={JustifyContent.Center}>
      <Space gutter={Gutter.Large}>
        <Space gutter={Gutter.Tiny} align={AlignItems.Center}>
          <Text category="h5">✨</Text>
          <Text category="h5">
            {strings['stocktakingResultScreen.successMessage']}
          </Text>
          <Text category="h5">✨✨</Text>
        </Space>
        <Button>{strings['stocktakingResultScreen.goToMenuButton']}</Button>
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
              <Text category="h6">
                {strings['stocktakingResultScreen.notFoundNextItems']}
              </Text>
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
