import { FieldPath, FieldValues } from 'react-hook-form';
import TextField, { type TextFieldProps } from './TextField';
import PasswordField, { type PasswordFieldProps } from './PasswordField';
import NumberField, { type NumberFieldProps } from './NumberField';

import SelectField, { type SelectFieldProps } from './SelectField';
import DateTimeField, { type DateTimeFieldProps } from './DateTimeField';

export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = (
  | TextFieldProps<TFieldValues, TName>
  | PasswordFieldProps<TFieldValues, TName>
  | NumberFieldProps<TFieldValues, TName>
  | SelectFieldProps<TFieldValues, TName>
  | DateTimeFieldProps<TFieldValues, TName>
) & {
  type: 'text' | 'password' | 'number' | 'select' | 'date-time';
};

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: FormFieldProps<TFieldValues, TName>
) => {
  const { type, ...rest } = props;

  if (type === 'text') {
    return <TextField {...rest} />;
  }

  if (type === 'password') {
    return <PasswordField {...rest} />;
  }

  if (type === 'number') {
    return <NumberField {...rest} />;
  }

  if (type === 'select') {
    // @ts-ignore
    return <SelectField {...rest} />;
  }

  if (type === 'date-time') {
    return <DateTimeField {...rest} />;
  }

  return null;
};

export default FormField;
