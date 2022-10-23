import React from 'react';
import {Layout} from '@ui-kitten/components';
import {observer} from 'mobx-react-lite';

export type AccountScreenProps = {};

export default observer(function AccountScreen({}: AccountScreenProps) {
  return <Layout level="1" />;
});
