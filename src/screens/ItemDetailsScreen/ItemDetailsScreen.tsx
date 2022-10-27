import React from 'react';
import {Image, View} from 'react-native';
import {Button, Divider, Icon, IconProps, Text} from '@ui-kitten/components';
import {Bubble, Gutter, Space} from '../../components';
import {useStrings, variance} from '../../core';
import StepList, {Step} from './StepList';
import {range} from 'lodash';
import dayjs from 'dayjs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {ItemType} from '../../tempTypes';

export type ItemDetailsScreenProps = {
  item: ItemType;
};

export default function ItemDetailsScreen({item}: ItemDetailsScreenProps) {
  const strings = useStrings();
  return (
    <RootView>
      <ScrollView>
        <SafeAreaView edges={['bottom']}>
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
                      {_.label}: {_.value}
                    </Text>
                  ))}
                </Space>
              </Space>
              <StepList steps={DATA} />
            </Space>
          </Bubble>
          <Divider />
          <Bubble>
            <Button
              status={item.qrData ? 'basic' : 'primary'}
              accessoryLeft={QrIcon}>
              {item.qrData
                ? strings['itemDetailsScreen.replaceQrButton']
                : strings['itemDetailsScreen.addQrButton']}
            </Button>
          </Bubble>
        </SafeAreaView>
      </ScrollView>
    </RootView>
  );
}

const QrIcon = (props: IconProps) => (
  <Icon name="qr" pack="assets" {...props} />
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
