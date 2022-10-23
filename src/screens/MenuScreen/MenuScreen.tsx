import React from 'react';
import {Icon, IconProps, Layout, MenuItem, Text} from '@ui-kitten/components';
import {observer} from 'mobx-react-lite';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStrings} from '../../core';
import {ScrollView} from 'react-native-gesture-handler';
import {Bubble, Gutter, Space} from '../../components';

export type MenuScreenProps = {
  onScanPress: () => void;
  goToFindUser: () => void;
  goToFindItem: () => void;
  goToCreateItem: () => void;
};

export default observer(function MenuScreen({
  onScanPress,
  goToFindUser,
  goToFindItem,
  goToCreateItem,
}: MenuScreenProps) {
  const strings = useStrings();
  return (
    <Layout style={styles.root} level="1">
      <ScrollView contentContainerStyle={styles.container}>
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
                    onPress={goToFindItem}
                  />
                  <MenuItem
                    title={strings['menuScreen.goodsAndMaterials.create']}
                    accessoryLeft={PlusOutlineIcon}
                    onPress={goToCreateItem}
                  />
                  <MenuItem
                    title={strings['menuScreen.goodsAndMaterials.transfer']}
                    accessoryLeft={UploadOutlineIcon}
                  />
                  <MenuItem
                    title={strings['menuScreen.goodsAndMaterials.receive']}
                    accessoryLeft={DownloadOutlineIcon}
                  />
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
                  <MenuItem
                    title={strings['menuScreen.scanning.qrMarking']}
                    accessoryLeft={ArrowheadDownOutlineIcon}
                  />
                </View>
              </Space>

              <Space gutter={Gutter.Small}>
                <Bubble gutter={[0, Gutter.Middle]}>
                  <Text category="h5">{strings['menuScreen.users.title']}</Text>
                </Bubble>
                <View>
                  <MenuItem
                    title={strings['menuScreen.users.find']}
                    accessoryLeft={SearchIcon}
                    onPress={goToFindUser}
                  />
                  <MenuItem
                    title={strings['menuScreen.users.invite']}
                    accessoryLeft={PersonAddOutline}
                  />
                </View>
              </Space>

              <MenuItem
                title={strings['menuScreen.stocktaking']}
                accessoryLeft={DoneAllOutlineIcon}
              />

              <Space gutter={Gutter.Small}>
                <Bubble gutter={[0, Gutter.Middle]}>
                  <Text category="h5">
                    {strings['menuScreen.reports.title']}
                  </Text>
                </Bubble>
                <View>
                  <MenuItem
                    title={strings['menuScreen.reports.getReport']}
                    accessoryLeft={FileTextOutlineIcon}
                  />
                </View>
              </Space>
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
const DownloadOutlineIcon = (props: IconProps) => (
  <Icon {...props} name="download-outline" />
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
const FileTextOutlineIcon = (props: IconProps) => (
  <Icon {...props} name="file-text-outline" />
);
const PersonAddOutline = (props: IconProps) => (
  <Icon {...props} name="person-add-outline" />
);
const DoneAllOutlineIcon = (props: IconProps) => (
  <Icon {...props} name="done-all-outline" />
);
