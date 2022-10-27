import React from 'react';
import {observer} from 'mobx-react-lite';
import {
  FindUserScene,
  FindUserSceneProps,
} from '../../components/scenes/FindUserScene';

type FindUserScreenProps = FindUserSceneProps & {};

export default observer(function FindUserScreen(props: FindUserScreenProps) {
  return <FindUserScene {...props} />;
});
