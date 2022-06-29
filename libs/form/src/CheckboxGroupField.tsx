import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  FieldValues,
  UnpackNestedValue,
} from 'react-hook-form';

import { CheckboxGroupInput, type CheckboxGroupInputProps } from '@sa/components';

export type CheckboxGroupFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<CheckboxGroupInputProps, 'onChange' | 'defaultValue'> & {
  name: TName;
  control?: Control<TFieldValues>;
  defaultValue?: UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
};

const CheckboxGroupField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: CheckboxGroupFieldProps<TFieldValues, TName>
) => {
  const { name, control, defaultValue, error, helperText, options, ...restInputProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <CheckboxGroupInput
          {...restInputProps}
          {...field}
          defaultValue={field.value}
          options={options}
          error={error || !!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : helperText}
        />
      )}
    />
  );
};

export default CheckboxGroupField;
