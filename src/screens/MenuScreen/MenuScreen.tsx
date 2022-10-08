import React from 'react';
import {
  Icon,
  IconProps,
  Layout,
  Menu,
  MenuGroup,
  MenuItem,
} from '@ui-kitten/components';
import {observer} from 'mobx-react-lite';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useStrings} from '../../core';

export type MenuScreenProps = {
  onScanPress: () => void;
};

export default observer(function MenuScreen({onScanPress}: MenuScreenProps) {
  const insets = useSafeAreaInsets();
  const strings = useStrings();
  return (
    <Layout style={styles.root} level="1">
      <Menu
        contentContainerStyle={{paddingBottom: insets.bottom}}
        style={styles.list}>
        <MenuGroup
          title={strings['menu.goodsAndMaterials.title']}
          accessoryLeft={ListOutlineIcon}>
          <MenuItem
            title={strings['menu.goodsAndMaterials.find']}
            accessoryLeft={SearchIcon}
          />
          <MenuItem
            title={strings['menu.goodsAndMaterials.create']}
            accessoryLeft={PlusOutlineIcon}
          />
          <MenuItem
            title={strings['menu.goodsAndMaterials.issueGoods']}
            accessoryLeft={UploadOutlineIcon}
          />
          <MenuItem
            title={strings['menu.goodsAndMaterials.receive']}
            accessoryLeft={DownloadOutlineIcon}
          />
          <MenuItem
            title={strings['menu.goodsAndMaterials.return']}
            accessoryLeft={UploadOutlineIcon}
          />
        </MenuGroup>
        <MenuGroup
          title={strings['menu.scanning.title']}
          accessoryLeft={QrIcon}>
          <MenuItem
            onPress={onScanPress}
            title={strings['menu.scanning.scan']}
            accessoryLeft={CameraIcon}
          />
          <MenuItem
            title={strings['menu.scanning.qrMarking']}
            accessoryLeft={ArrowheadDownOutlineIcon}
          />
          <MenuItem
            title={strings['menu.scanning.changeQr']}
            accessoryLeft={SwapIcon}
          />
        </MenuGroup>
        <MenuItem
          title={strings['menu.stocktaking']}
          accessoryLeft={DoneAllOutlineIcon}
        />
        <MenuGroup
          title={strings['menu.users.title']}
          accessoryLeft={PeopleOutlineIcon}>
          <MenuItem
            title={strings['menu.users.find']}
            accessoryLeft={SearchIcon}
          />
          <MenuItem
            title={strings['menu.users.create']}
            accessoryLeft={PersonAddOutline}
          />
        </MenuGroup>
        <MenuGroup
          title={strings['menu.reports.title']}
          accessoryLeft={FileOutlineIcon}>
          <MenuItem
            title={strings['menu.reports.getReport']}
            accessoryLeft={FileTextOutlineIcon}
          />
        </MenuGroup>
      </Menu>
    </Layout>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});

const ListOutlineIcon = (props: IconProps) => (
  <Icon {...props} name="list-outline" />
);
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
const SwapIcon = (props: IconProps) => <Icon {...props} name="swap-outline" />;
const CameraIcon = (props: IconProps) => (
  <Icon {...props} name="camera-outline" />
);
const ArrowheadDownOutlineIcon = (props: IconProps) => (
  <Icon {...props} name="arrowhead-down-outline" />
);
const FileOutlineIcon = (props: IconProps) => (
  <Icon {...props} name="file-outline" />
);
const FileTextOutlineIcon = (props: IconProps) => (
  <Icon {...props} name="file-text-outline" />
);
const PeopleOutlineIcon = (props: IconProps) => (
  <Icon {...props} name="people-outline" />
);
const PersonAddOutline = (props: IconProps) => (
  <Icon {...props} name="person-add-outline" />
);
const DoneAllOutlineIcon = (props: IconProps) => (
  <Icon {...props} name="done-all-outline" />
);
const QrIcon = ({style, ...rest}: IconProps) => (
  <Icon
    {...rest}
    name="qr"
    pack="assets"
    style={[style, {width: 16, height: 16}]}
  />
);
