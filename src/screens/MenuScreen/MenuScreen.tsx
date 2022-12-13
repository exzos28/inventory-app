import React from 'react';
import {Icon, IconProps, Layout, MenuItem, Text} from '@ui-kitten/components';
import {observer} from 'mobx-react-lite';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoot, useStrings} from '../../core';
import {ScrollView} from 'react-native-gesture-handler';
import {Bubble, Gutter, Space} from '../../components';
import {UserRole} from '../../core/HadesServer';

export type MenuScreenProps = {
  onScanPress: () => void;
  onFindUserPress: () => void;
  onFindItemPress: () => void;
  onCreateItemPress: () => void;
  onSelectUserToTransferPress: () => void;
  onSelectItemForQrMarking: () => void;
  onInviteUserPress: () => void;
  onStocktakingPress: () => void;
};

export default observer(function MenuScreen({
  onScanPress,
  onFindUserPress,
  onFindItemPress,
  onCreateItemPress,
  onSelectUserToTransferPress,
  onSelectItemForQrMarking,
  onInviteUserPress,
  onStocktakingPress,
}: MenuScreenProps) {
  const strings = useStrings();
  const {
    projectPermissionHelper: {isSomeRoleOrBetter},
  } = useRoot();
  return (
    <Layout style={styles.root} level="1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <SafeAreaView edges={['bottom']}>
          <Bubble gutter={[Gutter.Middle, 0]}>
            <Space>
              <Space gutter={Gutter.Small}>
                <Bubble gutter={[0, Gutter.Middle]}>
                  <Text category="h5">
                    {strings['menuScreen.goodsAndMaterials.title']}
                  </Text>
                </Bubble>
                <View>
                  <MenuItem
                    title={strings['menuScreen.goodsAndMaterials.find']}
                    accessoryLeft={SearchIcon}
                    onPress={onFindItemPress}
                  />
                  {isSomeRoleOrBetter(UserRole.Manager) && (
                    <MenuItem
                      title={strings['menuScreen.goodsAndMaterials.create']}
                      accessoryLeft={PlusOutlineIcon}
                      onPress={onCreateItemPress}
                    />
                  )}
                  {isSomeRoleOrBetter(UserRole.Manager) && (
                    <MenuItem
                      title={strings['menuScreen.goodsAndMaterials.transfer']}
                      accessoryLeft={UploadOutlineIcon}
                      onPress={onSelectUserToTransferPress}
                    />
                  )}
                </View>
              </Space>

              <Space gutter={Gutter.Small}>
                <Bubble gutter={[0, Gutter.Middle]}>
                  <Text category="h5">
                    {strings['menuScreen.scanning.title']}
                  </Text>
                </Bubble>
                <View>
                  <MenuItem
                    onPress={onScanPress}
                    title={strings['menuScreen.scanning.scan']}
                    accessoryLeft={CameraIcon}
                  />
                  {isSomeRoleOrBetter(UserRole.Manager) && (
                    <MenuItem
                      onPress={onSelectItemForQrMarking}
                      title={strings['menuScreen.scanning.qrMarking']}
                      accessoryLeft={ArrowheadDownOutlineIcon}
                    />
                  )}
                </View>
              </Space>

              {isSomeRoleOrBetter(UserRole.Admin) && (
                <Space gutter={Gutter.Small}>
                  <Bubble gutter={[0, Gutter.Middle]}>
                    <Text category="h5">
                      {strings['menuScreen.users.title']}
                    </Text>
                  </Bubble>
                  <View>
                    <MenuItem
                      title={strings['menuScreen.users.find']}
                      accessoryLeft={SearchIcon}
                      onPress={onFindUserPress}
                    />
                    <MenuItem
                      title={strings['menuScreen.users.invite']}
                      accessoryLeft={PersonAddOutline}
                      onPress={onInviteUserPress}
                    />
                  </View>
                </Space>
              )}
              <MenuItem
                title={strings['menuScreen.stocktaking']}
                accessoryLeft={DoneAllOutlineIcon}
                onPress={onStocktakingPress}
              />
            </Space>
          </Bubble>
        </SafeAreaView>
      </ScrollView>
    </Layout>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
});

const SearchIcon = (props: IconProps) => (
  <Icon {...props} name="search-outline" />
);
const PlusOutlineIcon = (props: IconProps) => (
  <Icon {...props} name="plus-outline" />
);
const UploadOutlineIcon = (props: IconProps) => (
  <Icon {...props} name="upload-outline" />
);
const CameraIcon = (props: IconProps) => (
  <Icon {...props} name="camera-outline" />
);
const ArrowheadDownOutlineIcon = (props: IconProps) => (
  <Icon {...props} name="arrowhead-down-outline" />
);
const PersonAddOutline = (props: IconProps) => (
  <Icon {...props} name="person-add-outline" />
);
const DoneAllOutlineIcon = (props: IconProps) => (
  <Icon {...props} name="done-all-outline" />
);
