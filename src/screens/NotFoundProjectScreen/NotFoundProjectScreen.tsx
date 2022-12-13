import React from 'react';
import {observer} from 'mobx-react-lite';
import {StyleSheet} from 'react-native';
import {Button, Layout, Text} from '@ui-kitten/components';
import {Gutter, Space} from '../../components';
import {useStrings} from '../../core';

export type NotFoundProjectScreenProps = {
  onCreateProjectPress: () => void;
};

export default observer(function NotFoundProjectScreen({
  onCreateProjectPress,
}: NotFoundProjectScreenProps) {
  const strings = useStrings();
  return (
    <Layout style={styles.root} level="1">
      <Space gutter={Gutter.Large}>
        <Text category="h4">{strings['notFoundProjectScreen.title']}</Text>
        <Button onPress={onCreateProjectPress}>
          {strings['notFoundProjectScreen.createButton']}
        </Button>
      </Space>
    </Layout>
  );
});

const styles = StyleSheet.create({
  root: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
