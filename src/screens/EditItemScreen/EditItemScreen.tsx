import React from 'react';
import {Either, useStrings} from '../../core';
import {
  ItemFormValues,
  ItemFormScene,
} from '../../components/scenes/ItemFormScene';
import {Item} from '../../core/ItemHelper';

export type EditItemScreenProps = {
  onEditPress: (values: ItemFormValues) => void;
  onNewFieldNameRequest: () => Promise<Either<string, void>>;
  item: Item;
};

export default function EditItemScreen({
  onEditPress,
  onNewFieldNameRequest,
  item,
}: EditItemScreenProps) {
  const strings = useStrings();
  return (
    <ItemFormScene
      onSubmitPress={onEditPress}
      onNewFieldNameRequest={onNewFieldNameRequest}
      submitTitle={strings['editItemScreen.editButton']}
      defaultValues={item}
    />
  );
}
