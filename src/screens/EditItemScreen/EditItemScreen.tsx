import React from 'react';
import {Either, useStrings} from '../../core';
import {InputsResult, ItemFormScene} from '../../scenes/ItemFormScene';
import {ITEMS} from '../../MOCK';

export type EditItemScreenProps = {
  onCreatePress: (_: InputsResult) => void;
  onNewFieldNameRequest: () => Promise<Either<string, void>>;
};

export default function EditItemScreen({
  onCreatePress,
  onNewFieldNameRequest,
}: EditItemScreenProps) {
  const strings = useStrings();
  return (
    <ItemFormScene
      onSubmitPress={onCreatePress}
      onNewFieldNameRequest={onNewFieldNameRequest}
      submitTitle={strings['editItemScreen.editButton']}
      defaultValues={DEFAULT_VALUES}
    />
  );
}

const DEFAULT_VALUES = {
  ...ITEMS[0],
  image: {uri: ITEMS[0].image},
};
