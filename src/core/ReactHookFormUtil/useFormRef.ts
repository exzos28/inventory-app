import {Ref, useImperativeHandle} from 'react';

import {FieldValues, UseFormReturn} from 'react-hook-form/dist/types';
import {UseFormSetError} from 'react-hook-form/dist/types/form';

export type FormRef<V extends FieldValues = any> = {
  setError: UseFormSetError<V>;
};

export default function useFormRef<
  V extends FieldValues = FieldValues,
  C = any,
>(form: UseFormReturn<V, C>, ref?: Ref<FormRef<V>>) {
  useImperativeHandle(ref, () => ({
    setError: (name, error, options) => {
      return form.setError(name, error, options);
    },
  }));
}
