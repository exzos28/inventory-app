import React from 'react';
import {observer} from 'mobx-react-lite';
import {AccountScreen} from '../../screens/AccountScreen';

export default observer(function AccountBinding() {
  return <AccountScreen />;
});
