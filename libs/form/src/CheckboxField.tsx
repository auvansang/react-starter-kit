import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  FieldValues,
  UnpackNestedValue,
} from 'react-hook-form';

import { CheckboxInput, type CheckboxInputProps } from '@sa/components';

export type CheckboxFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<CheckboxInputProps, 'name' | 'onChange' | 'onBlur' | 'defaultValue'> & {
  name: TName;
  control?: Control<TFieldValues>;
  defaultValue?: UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
};

const CheckboxField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: CheckboxFieldProps<TFieldValues, TName>
) => {
  const { name, control, defaultValue, error, helperText, ...restInputProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <CheckboxInput
          {...restInputProps}
          {...field}
          checked={!!field.value}
          error={error || !!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : helperText}
        />
      )}
    />
  );
};

export default CheckboxField;
