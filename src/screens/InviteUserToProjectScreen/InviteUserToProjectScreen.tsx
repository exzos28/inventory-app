import React, {Ref} from 'react';
import {observer} from 'mobx-react-lite';
import {ScrollView, StyleSheet} from 'react-native';
import {Button, Input, Radio, Text} from '@ui-kitten/components';
import {Bubble, Gutter, Space} from '../../components';
import {useStrings, variance} from '../../core';
import {NavigationIQKeyboardManager} from '../../navigation/components';
import {Controller, useForm} from 'react-hook-form';
import {EMAIL_PATTER} from '../../core/Validation/pattern';
import {FormRef, useFormRef} from '../../core/ReactHookFormUtil';
import {UserRole} from '../../core/HadesServer';

export type InviteUserToProjectScreenProps = {
  onInvitePress: (values: InviteUserToProjectFormValues) => void;
  formRef?: Ref<InviteUserToProjectFormRef>;
};

export type InviteUserToProjectFormRef = FormRef<InviteUserToProjectFormValues>;

export type InviteUserToProjectFormValues = {
  email: string;
  role: UserRole;
};

// TODO l10n
export default observer(function InviteUserToProjectScreen({
  onInvitePress,
  formRef,
}: InviteUserToProjectScreenProps) {
  const form = useForm<InviteUserToProjectFormValues>({
    defaultValues: {
      role: UserRole.User,
    },
  });
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = form;
  useFormRef<InviteUserToProjectFormValues>(form, formRef);
  const strings = useStrings();
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
                pattern: EMAIL_PATTER,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Space gutter={Gutter.Tiny}>
                  <Input
                    autoFocus
                    autoCapitalize="none"
                    placeholder="User email"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={errors.email !== undefined ? 'danger' : 'basic'}
                  />
                  {errors.email?.message && (
                    <Text category="c1" status="danger">
                      {errors.email?.message}
                    </Text>
                  )}
                </Space>
              )}
              name="email"
            />
            <Space gutter={Gutter.Tiny}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, value}}) => (
                  <Space>
                    <Radio
                      onChange={_ => _ && onChange(UserRole.Admin)}
                      checked={value === UserRole.Admin}>
                      {strings['role.admin']}
                    </Radio>
                    <Radio
                      onChange={_ => _ && onChange(UserRole.Manager)}
                      checked={value === UserRole.Manager}>
                      {strings['role.manager']}
                    </Radio>
                    <Radio
                      onChange={_ => _ && onChange(UserRole.User)}
                      checked={value === UserRole.User}>
                      {strings['role.user']}
                    </Radio>
                  </Space>
                )}
                name="role"
              />
            </Space>
            <Button onPress={handleSubmit(onInvitePress)}>Add</Button>
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
