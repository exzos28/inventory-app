import React from 'react';
import {observer} from 'mobx-react-lite';
import {ScrollView, StyleSheet} from 'react-native';
import {Button, Input} from '@ui-kitten/components';
import {Bubble, Gutter, Space} from '../../components';
import {useStrings, variance} from '../../core';
import {NavigationIQKeyboardManager} from '../../navigation/components';
import {Controller, useForm} from 'react-hook-form';

export type CreateProjectScreen = {
  onCreateProjectPress: (values: CreateProjectFormValues) => void;
};

export type CreateProjectFormValues = {
  name: string;
};

export default observer(function CreateProjectScreen({
  onCreateProjectPress,
}: CreateProjectScreen) {
  const strings = useStrings();
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<CreateProjectFormValues>();
  return (
    <RootIQKeyboardManager>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always">
        <Bubble>
          <Space gutter={Gutter.Large}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  autoFocus
                  placeholder={strings['createProjectScreen.inputName']}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={errors.name !== undefined ? 'danger' : 'basic'}
                />
              )}
              name="name"
            />

            <Button onPress={handleSubmit(onCreateProjectPress)}>
              {strings['common.create']}
            </Button>
          </Space>
        </Bubble>
      </ScrollView>
    </RootIQKeyboardManager>
  );
});

const RootIQKeyboardManager = variance(NavigationIQKeyboardManager)(theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.palette['background-basic-color-1'],
  },
}));

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
