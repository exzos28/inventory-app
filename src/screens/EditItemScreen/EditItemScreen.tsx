import React from 'react';
import {Either, useStrings} from '../../core';
import {
  InputsResult,
  ItemFormScene,
} from '../../components/scenes/ItemFormScene';
import {ItemType} from '../../tempTypes';

export type EditItemScreenProps = {
  onCreatePress: (_: InputsResult) => void;
  onNewFieldNameRequest: () => Promise<Either<string, void>>;
  item: ItemType;
};

export default function EditItemScreen({
  onCreatePress,
  onNewFieldNameRequest,
  item,
}: EditItemScreenProps) {
  const strings = useStrings();
  return (
    <ItemFormScene
      onSubmitPress={onCreatePress}
      onNewFieldNameRequest={onNewFieldNameRequest}
      submitTitle={strings['editItemScreen.editButton']}
      defaultValues={{
        ...item,
        image: item.image ? {uri: item.image} : undefined,
      }}
    />
  );
}
