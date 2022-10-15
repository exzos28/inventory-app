import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import FindUserScreen from '../../screens/FindUserScreen/FindUserScreen';

export default observer(function FindUserBinding() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <FindUserScreen searchValue={searchValue} onChangeText={setSearchValue} />
  );
});
