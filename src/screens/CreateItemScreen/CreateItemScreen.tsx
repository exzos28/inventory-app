import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Icon, IconProps, Input} from '@ui-kitten/components';
import {Bubble, Space, Gutter} from '../../components';
import {Uri, useStrings, variance} from '../../core';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {launchImageLibraryAsync, MediaTypeOptions} from 'expo-image-picker';

const ACTIONS_HEIGHT = 75;

export type CreateItemScreenProps = {
  onCreatePress: () => void;
};

export default function CreateItemScreen({
  onCreatePress,
}: CreateItemScreenProps) {
  const strings = useStrings();
  const [image, setImage] = useState<Uri>();

  const pickImage = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri as Uri);
    }
  }, []);
  return (
    <RootView>
      <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView
          style={{paddingBottom: ACTIONS_HEIGHT}}
          edges={['bottom']}>
          <ItemImageView>
            {image ? (
              <ItemImage
                resizeMode="contain"
                source={{
                  uri: image,
                }}
              />
            ) : (
              <ItemImagePickerView>
                <Button onPress={pickImage} accessoryLeft={PickImageIcon}>
                  {strings['createItem.pickImageButton']}
                </Button>
              </ItemImagePickerView>
            )}
          </ItemImageView>
          <Bubble>
            <Space gutter={Gutter.Middle}>
              <Space>
                <Space gutter={Gutter.Small}>
                  <Input
                    label={strings['createItem.itemNameLabel']}
                    placeholder="HP Neverstop Laser"
                  />
                  <Input
                    label={strings['createItem.serialNumberLabel']}
                    placeholder="4QD21A"
                  />
                </Space>
              </Space>
            </Space>
          </Bubble>
        </SafeAreaView>
      </ScrollView>
      <AbsoluteActionsView gutter={[0, Gutter.Middle]}>
        <AbsoluteActionsContentView edges={['bottom']}>
          <Button accessoryLeft={CheckmarkIcon} onPress={onCreatePress}>
            {strings['menu.goodsAndMaterials.create']}
          </Button>
        </AbsoluteActionsContentView>
      </AbsoluteActionsView>
    </RootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

const CheckmarkIcon = (props: IconProps) => (
  <Icon {...props} name="checkmark-outline" />
);
const PickImageIcon = (props: IconProps) => (
  <Icon {...props} name="image-outline" />
);

const RootView = variance(View)(theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.palette['background-basic-color-1'],
  },
}));

const ItemImageView = variance(View)(theme => ({
  root: {
    height: 250,
    backgroundColor: theme.palette['background-basic-color-4'],
  },
}));

const ItemImagePickerView = variance(View)(() => ({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const ItemImage = variance(Image)(() => ({
  root: {
    flex: 1,
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
