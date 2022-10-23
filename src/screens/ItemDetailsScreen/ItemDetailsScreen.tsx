import React from 'react';
import {Image, View} from 'react-native';
import {Button, Icon, IconProps, Text} from '@ui-kitten/components';
import {Bubble, Gutter, Space} from '../../components';
import {useStrings, variance} from '../../core';
import StepList, {Step} from './StepList';
import {range} from 'lodash';
import dayjs from 'dayjs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {Item} from '../../tempTypes';

const ACTIONS_HEIGHT = 75;

export type ItemDetailsScreenProps = {
  onTransferPress: () => void;
  item: Item;
};

export default function ItemDetailsScreen({
  onTransferPress,
  item,
}: ItemDetailsScreenProps) {
  const strings = useStrings();
  return (
    <RootView>
      <ScrollView>
        <SafeAreaView
          style={{paddingBottom: ACTIONS_HEIGHT}}
          edges={['bottom']}>
          <ItemImage source={{uri: item.image}} />
          <Bubble>
            <Space gutter={Gutter.Middle}>
              <Space>
                <Space gutter={Gutter.Small}>
                  <Text category="h6">{item.name}</Text>
                  <Text appearance="hint" category="c1">
                    {strings['itemDetailsScreen.serialNumber']}{' '}
                    {item.serialNumber}
                  </Text>
                  {item.fields.map((_, index) => (
                    <Text key={index} appearance="hint" category="c1">
                      {_.label} {_.value}
                    </Text>
                  ))}
                </Space>
              </Space>
              <StepList steps={DATA} />
            </Space>
          </Bubble>
        </SafeAreaView>
      </ScrollView>

      <AbsoluteActionsView gutter={[0, Gutter.Middle]}>
        <AbsoluteActionsContentView edges={['bottom']}>
          <Button accessoryLeft={CornerRightUpIcon} onPress={onTransferPress}>
            {strings['itemDetailsScreen.transfer']}
          </Button>
        </AbsoluteActionsContentView>
      </AbsoluteActionsView>
    </RootView>
  );
}

const CornerRightUpIcon = (props: IconProps) => (
  <Icon {...props} name="corner-right-up-outline" />
);

const DATA: Step[] = range(10).map(_ => ({title: 'Title_' + _, date: dayjs()}));

const RootView = variance(View)(theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.palette['background-basic-color-1'],
  },
}));

const ItemImage = variance(Image)(theme => ({
  root: {
    height: 340,
    width: '100%',
    backgroundColor: theme.palette['background-basic-color-4'],
  },
}));

const AbsoluteActionsView = variance(Bubble)(() => ({
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

const AbsoluteActionsContentView = variance(SafeAreaView)(() => ({
  root: {
    paddingBottom: Gutter.Middle,
  },
}));
