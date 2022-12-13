import React from 'react';
import {Image, View} from 'react-native';
import {Button, Divider, Icon, IconProps, Text} from '@ui-kitten/components';
import {Bubble, Gutter, Space} from '../../components';
import {useRoot, useStrings, variance} from '../../core';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {DetailedItem} from '../../core/ItemDetailsState';
import {UserRole} from '../../core/HadesServer';

export type ItemDetailsScreenProps = {
  detailedItem: DetailedItem;
  onDeletePress: () => void;
  onAddQrPress: () => void;
};

export default function ItemDetailsScreen({
  detailedItem,
  onDeletePress,
  onAddQrPress,
}: ItemDetailsScreenProps) {
  const strings = useStrings();
  const {
    projectPermissionHelper: {isSomeRoleOrBetter},
  } = useRoot();
  const {item, owner} = detailedItem;
  return (
    <RootView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView edges={['bottom']}>
          <ItemImage source={{uri: item.image}} />
          <Bubble>
            <Space gutter={Gutter.Middle}>
              <Space>
                <Space gutter={Gutter.Small}>
                  <Text category="h6">{item.name}</Text>
                  {item.serialNumber !== undefined && (
                    <Text appearance="hint" category="c1">
                      {strings['itemDetailsScreen.serialNumber']}{' '}
                      {item.serialNumber}
                    </Text>
                  )}
                  {owner !== undefined && (
                    <Text appearance="hint" category="c1">
                      {strings['itemDetailsScreen.currentOwner']}
                      {'\n'}
                      {owner.username}
                    </Text>
                  )}
                  {item.customFields?.map((_, index) => (
                    <Text key={index} appearance="hint" category="c1">
                      {_.label}: {_.value}
                    </Text>
                  ))}
                </Space>
              </Space>
            </Space>
          </Bubble>
          <Divider />
          {isSomeRoleOrBetter(UserRole.Manager) && (
            <Bubble>
              <Space>
                <Button
                  onPress={onAddQrPress}
                  status={item.qrKey ? 'basic' : 'primary'}
                  accessoryLeft={QrIcon}>
                  {item.qrKey
                    ? strings['itemDetailsScreen.replaceQrButton']
                    : strings['itemDetailsScreen.addQrButton']}
                </Button>
                <Button
                  onPress={onDeletePress}
                  status="danger"
                  accessoryLeft={TrashIcon}>
                  {strings['common.delete']}
                </Button>
              </Space>
            </Bubble>
          )}
        </SafeAreaView>
      </ScrollView>
    </RootView>
  );
}

const QrIcon = (props: IconProps) => (
  <Icon name="qr" pack="assets" {...props} />
);

const TrashIcon = (props: IconProps) => (
  <Icon name="trash-outline" {...props} />
);

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
