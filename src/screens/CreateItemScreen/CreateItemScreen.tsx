import React from 'react';
import {Either, useStrings} from '../../core';
import {
  ItemFormScene,
  InputsResult,
} from '../../components/scenes/ItemFormScene';

export type CreateItemScreenProps = {
  onCreatePress: (_: InputsResult) => void;
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
