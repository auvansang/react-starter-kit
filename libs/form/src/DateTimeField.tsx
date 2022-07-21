import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  FieldValues,
  UnpackNestedValue,
} from 'react-hook-form';

import { DateTimeInput, type DateTimeInputProps } from '@sa/components';

export type DateTimeFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<DateTimeInputProps, 'name' | 'onChange' | 'onBlur' | 'defaultValue' | 'onError'> & {
  name: TName;
  control?: Control<TFieldValues>;
  defaultValue?: UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
};

const DateTimeField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: DateTimeFieldProps<TFieldValues, TName>
) => {
  const { name, control, defaultValue, error, helperText, ...restInputProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <DateTimeInput
          {...restInputProps}
          {...field}
          error={error || !!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : helperText}
        />
      )}
    />
  );
};

export default DateTimeField;
