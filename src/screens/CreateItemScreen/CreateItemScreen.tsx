import React from 'react';
import {Either, useStrings} from '../../core';
import {
  ItemFormScene,
  ItemFormValues,
} from '../../components/scenes/ItemFormScene';

export type CreateItemScreenProps = {
  onCreatePress: (_: ItemFormValues) => void;
  onNewFieldNameRequest: () => Promise<Either<string, void>>;
};

export default function CreateItemScreen({
  onCreatePress,
  onNewFieldNameRequest,
}: CreateItemScreenProps) {
  const strings = useStrings();
  return (
    <ItemFormScene
      onSubmitPress={onCreatePress}
      onNewFieldNameRequest={onNewFieldNameRequest}
      submitTitle={strings['createItemScreen.createButton']}
    />
  );
}
