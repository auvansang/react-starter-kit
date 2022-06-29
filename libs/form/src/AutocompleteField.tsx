import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  FieldValues,
  UnpackNestedValue,
} from 'react-hook-form';

import { AutocompleteInput, Option, type AutocompleteInputProps } from '@sa/components';

export type AutocompleteFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<
  AutocompleteInputProps<Option, boolean | undefined, boolean | boolean | undefined, boolean>,
  'onChange' | 'onBlur' | 'defaultValue'
> & {
  name: TName;
  control?: Control<TFieldValues>;
  defaultValue?: UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
};

const AutocompleteField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: AutocompleteFieldProps<TFieldValues, TName>
) => {
  const { options, name, control, defaultValue, error, helperText, ...restInputProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <AutocompleteInput
          {...restInputProps}
          {...field}
          onChange={(_, newValue) => field.onChange(newValue)}
          error={error || !!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : helperText}
          options={options}
        />
      )}
    />
  );
};

export default AutocompleteField;
