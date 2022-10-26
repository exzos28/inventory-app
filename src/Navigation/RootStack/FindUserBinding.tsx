import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import FindUserScreen from '../../screens/FindUserScreen/FindUserScreen';
import {USERS} from '../../MOCK';

export default observer(function FindUserBinding() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <FindUserScreen
      data={USERS}
      searchValue={searchValue}
      onChangeText={setSearchValue}
    />
  );
});
