import React from 'react';
import {Either, useStrings} from '../../core';
import {
  ItemFormValues,
  ItemFormScene,
} from '../../components/scenes/ItemFormScene';
import {Item} from '../../core/ItemRestClientHelper';

export type EditItemScreenProps = {
  onCreatePress: (
    values: ItemFormValues,
    touchedKeys: keyof ItemFormValues,
  ) => void;
  onNewFieldNameRequest: () => Promise<Either<string, void>>;
  item: Item;
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
      defaultValues={item}
    />
  );
}
