import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  FieldValues,
  UnpackNestedValue,
} from 'react-hook-form';

import { RadioGroupInput, type RadioGroupInputProps } from '@sa/components';

export type RadioGroupFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<RadioGroupInputProps, 'name' | 'onChange' | 'onBlur' | 'defaultValue'> & {
  name: TName;
  control?: Control<TFieldValues>;
  defaultValue?: UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
};

const RadioGroupField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: RadioGroupFieldProps<TFieldValues, TName>
) => {
  const { name, control, defaultValue, error, helperText, options, ...restInputProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <RadioGroupInput
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

export default RadioGroupField;
