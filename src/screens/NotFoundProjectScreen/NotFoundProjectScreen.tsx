import React from 'react';
import {observer} from 'mobx-react-lite';
import {StyleSheet} from 'react-native';
import {Button, Layout, Text} from '@ui-kitten/components';
import {Gutter, Space} from '../../components';

export type NotFoundProjectScreenProps = {
  onCreateProjectPress: () => void;
};

// TODO l10n
export default observer(function NotFoundProjectScreen({
  onCreateProjectPress,
}: NotFoundProjectScreenProps) {
  return (
    <Layout style={styles.root} level="1">
      <Space gutter={Gutter.Large}>
        <Text category="h4">Not found any projects</Text>
        <Button onPress={onCreateProjectPress}>Create project</Button>
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
