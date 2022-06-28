import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  FieldValues,
  UnpackNestedValue,
} from 'react-hook-form';

import { DateInput, type DateInputProps } from '@sa/components';

export type DateFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<DateInputProps, 'name' | 'onChange' | 'onBlur' | 'defaultValue' | 'onError'> & {
  name: TName;
  control?: Control<TFieldValues>;
  defaultValue?: UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
};

const DateField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: DateFieldProps<TFieldValues, TName>
) => {
  const { name, control, defaultValue, error, helperText, ...restInputProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <DateInput
          {...restInputProps}
          {...field}
          error={error || !!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : helperText}
        />
      )}
    />
  );
};

export default DateField;
