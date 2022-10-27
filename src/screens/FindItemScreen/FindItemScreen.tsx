import React from 'react';
import {observer} from 'mobx-react-lite';
import {
  FindItemScene,
  FindItemSceneProps,
} from '../../components/scenes/FindItemScene';

export type FindUserScreenProps = FindItemSceneProps & {};

export default observer(function FindUserScreen(props: FindUserScreenProps) {
  return <FindItemScene {...props} />;
});
