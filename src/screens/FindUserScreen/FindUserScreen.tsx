import React from 'react';
import {observer} from 'mobx-react-lite';
import {
  FindUserScene,
  FindUserSceneProps,
} from '../../components/scenes/FindUserScene';
import {StyleSheet, View} from 'react-native';
import {Button, Icon, IconProps} from '@ui-kitten/components';
import {User} from '../../core/ProjectUsersHelper';
import {UserId, UserRole} from '../../core/HadesServer';

export type FindUserScreenProps = FindUserSceneProps & {
  onDeleteUserPress: (user: User) => void;
  currentUserId: UserId;
  currentRole: UserRole;
};

// TODO l10n
export default observer(function FindUserScreen({
  onDeleteUserPress,
  currentUserId,
  ...rest
}: FindUserScreenProps) {
  return (
    <FindUserScene
      rightAccessory={user =>
        user.role !== UserRole.Owner &&
        user.id !== currentUserId && (
          <View style={styles.right}>
            <Button
              onPress={() => onDeleteUserPress(user)}
              size="small"
              status="danger"
              accessoryLeft={TrashIcon}
            />
          </View>
        )
      }
      {...rest}
    />
  );
});

const styles = StyleSheet.create({
  right: {
    flex: 1,
    justifyContent: 'center',
  },
});

const TrashIcon = (props: IconProps) => (
  <Icon {...props} name="trash-2-outline" />
);
