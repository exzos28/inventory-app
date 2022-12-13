import React from 'react';
import {observer} from 'mobx-react-lite';
import {Icon, Layout} from '@ui-kitten/components';
import {useTheme, variance} from '../../../core';
import {UserList, UserListProps} from '../../organisms/UserList';
import Leveler from '../../Leveler';
import {JustifyContent} from '../../types';
import {StyleSheet} from 'react-native';

export type FindUserSceneProps = UserListProps & {};

export default observer(function FindUserScene(props: FindUserSceneProps) {
  return (
    <RootLayout>
      <UserList {...props} />
    </RootLayout>
  );
});

export const RightArrowAccessory = observer(() => {
  const theme = useTheme();
  return (
    <Leveler justify={JustifyContent.Center}>
      <Icon
        name="chevron-right-outline"
        style={styles.icon}
        fill={theme.palette['color-basic-600']}
      />
    </Leveler>
  );
});

const RootLayout = variance(Layout)(() => ({
  root: {
    flex: 1,
  },
}));

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});
