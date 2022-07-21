import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  FieldValues,
  UnpackNestedValue,
} from 'react-hook-form';

import { SelectInput, type SelectInputProps } from '@sa/components';

export type SelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<SelectInputProps, 'name' | 'onChange' | 'onBlur' | 'defaultValue'> & {
  name: TName;
  control?: Control<TFieldValues>;
  defaultValue?: UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
};

const SelectField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: SelectFieldProps<TFieldValues, TName>
) => {
  const { options, name, control, defaultValue, error, helperText, ...restInputProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <SelectInput
          {...restInputProps}
          {...field}
          error={error || !!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : helperText}
          options={options}
        />
      )}
    />
  );
};

export default SelectField;
