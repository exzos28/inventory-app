import React from 'react';
import {StyleSheet} from 'react-native';

import {observer} from 'mobx-react-lite';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  AlignItems,
  Cell,
  Direction,
  Grid,
  Gutter,
  JustifyContent,
  Space,
} from '../../components';
import {useStrings} from '../../core/Root/hooks';
import variance from '../../core/styling/hoc/variance';
import {Button, Text} from '@ui-kitten/components';

export type ErrorScreenProps = {
  onReturnPress: () => void;
  raw?: unknown;
  description?: string;
};

export default observer(function ErrorScreen({
  onReturnPress,
  raw,
  description,
}: ErrorScreenProps) {
  const strings = useStrings();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RootView>
        <RootGrid direction={Direction.Column}>
          <Cell flex={2} align={AlignItems.Center}>
            <HeaderSpace justify={JustifyContent.Center} gutter={Gutter.Large}>
              <Space>
                <TitleText>{strings['errorScreen.title']}</TitleText>
                <DescriptionText>
                  {description !== undefined
                    ? description
                    : strings['errorScreen.description']}
                </DescriptionText>
                {raw !== undefined && (
                  <Text>{JSON.stringify(raw, null, 2)}</Text>
                )}
              </Space>
            </HeaderSpace>
          </Cell>
          <Cell justify={JustifyContent.End}>
            <Space>
              <Button onPress={onReturnPress}>
                {strings['errorScreen.returnButton']}
              </Button>
            </Space>
          </Cell>
        </RootGrid>
      </RootView>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

const RootView = variance(SafeAreaView)(theme => ({
  root: {
    backgroundColor: theme.palette['background-basic-color-1'],
    flex: 1,
    padding: 16,
  },
}));

const RootGrid = variance(Grid)(() => ({
  root: {
    flex: 1,
  },
}));

const HeaderSpace = variance(Space)(() => ({
  root: {
    flex: 1,
  },
}));

const TitleText = variance(Text)(() => ({
  root: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: -0.2,
  },
}));

const DescriptionText = variance(Text)(() => ({
  root: {
    fontSize: 17,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: -0.17,
  },
}));
