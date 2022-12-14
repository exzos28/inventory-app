import React, {useCallback} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Icon, IconProps, Input} from '@ui-kitten/components';
import {Bubble, Space} from '../../index';
import {Either, Uri, useStrings, variance} from '../../../core';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {launchImageLibraryAsync, MediaTypeOptions} from 'expo-image-picker';
import {Controller, useForm} from 'react-hook-form';
import CustomFieldList from './CustomFieldList';
import {ItemFormValues} from './types';
import {NavigationIQKeyboardManager} from '../../../navigation/components';
import {observer} from 'mobx-react-lite';

export type ItemFormSceneProps = {
  onSubmitPress: (values: ItemFormValues) => void;
  onNewFieldNameRequest: () => Promise<Either<string, void>>;
  submitTitle: string;
  defaultValues?: ItemFormValues;
};

export default function ItemFormScene({
  onSubmitPress,
  onNewFieldNameRequest,
  submitTitle,
  defaultValues,
}: ItemFormSceneProps) {
  const strings = useStrings();
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
    watch,
  } = useForm<ItemFormValues>({
    defaultValues: defaultValues,
  });
  const deleteImage = useCallback(() => {
    setValue('image', undefined);
  }, [setValue]);
  const pickImage = useCallback(async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: false,
      quality: 0.2,
    });
    if (!result.cancelled) {
      setValue('image', result.uri as Uri);
    }
  }, [setValue]);
  const imageValue = watch('image');
  return (
    <RootIQKeyboardManager>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always">
        <ContentSafeAreaView edges={['bottom']}>
          <ItemFormImage
            deleteImage={deleteImage}
            uri={imageValue}
            pickImage={pickImage}
          />
          <ContentBubble>
            <Space>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    label={strings['createItemScreen.itemNameLabel'] + '*'}
                    placeholder="HP Neverstop Laser"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={errors.name !== undefined ? 'danger' : 'basic'}
                  />
                )}
                name="name"
              />
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    label={strings['createItemScreen.serialNumberLabel']}
                    placeholder="4QD21A"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="serialNumber"
              />
              <CustomFieldList
                onNewFieldNameRequest={onNewFieldNameRequest}
                control={control}
              />
            </Space>
          </ContentBubble>
          <Bubble>
            <SubmitButton
              onPress={handleSubmit(onSubmitPress)}
              accessoryLeft={CheckmarkIcon}>
              {submitTitle}
            </SubmitButton>
          </Bubble>
        </ContentSafeAreaView>
      </ScrollView>
    </RootIQKeyboardManager>
  );
}

export type ItemFormImageProps = {
  uri?: Uri;
  pickImage: () => void;
  deleteImage: () => void;
};

const ItemFormImage = observer(
  ({uri, pickImage, deleteImage}: ItemFormImageProps) => {
    const strings = useStrings();
    return uri ? (
      <View>
        <ItemImage
          resizeMode="contain"
          source={{
            uri: uri,
          }}
        />
        <DeleteItemImageButton
          size="small"
          appearance="ghost"
          status="danger"
          accessoryLeft={TrashIcon}
          onPress={deleteImage}
        />
      </View>
    ) : (
      <ItemImagePickerView>
        <Button onPress={pickImage} accessoryLeft={PickImageIcon}>
          {strings['createItemScreen.pickImageButton']}
        </Button>
      </ItemImagePickerView>
    );
  },
);

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
const TrashIcon = (props: IconProps) => (
  <Icon {...props} name="trash-2-outline" />
);

const RootIQKeyboardManager = variance(NavigationIQKeyboardManager)(theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.palette['background-basic-color-1'],
  },
}));

const ContentSafeAreaView = variance(SafeAreaView)(() => ({
  root: {
    flex: 1,
  },
}));

const ContentBubble = variance(Bubble)(() => ({
  root: {
    flex: 1,
  },
}));

const ItemImagePickerView = variance(View)(theme => ({
  root: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette['background-basic-color-4'],
  },
}));

const ItemImage = variance(Image)(theme => ({
  root: {
    height: 250,
    backgroundColor: theme.palette['background-basic-color-4'],
  },
}));

const DeleteItemImageButton = variance(Button)(() => ({
  root: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
}));

const SubmitButton = variance(Button)(() => ({
  root: {
    marginTop: 'auto',
  },
}));
