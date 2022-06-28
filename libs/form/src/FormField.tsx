import { FieldPath, FieldValues } from 'react-hook-form';
import TextField, { type TextFieldProps } from './TextField';
import PasswordField, { type PasswordFieldProps } from './PasswordField';
import NumberField, { type NumberFieldProps } from './NumberField';

import SelectField, { type SelectFieldProps } from './SelectField';
import DateTimeField, { type DateTimeFieldProps } from './DateTimeField';
import DateField, { type DateFieldProps } from './DateField';

export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = (
  | TextFieldProps<TFieldValues, TName>
  | PasswordFieldProps<TFieldValues, TName>
  | NumberFieldProps<TFieldValues, TName>
  | SelectFieldProps<TFieldValues, TName>
  | DateTimeFieldProps<TFieldValues, TName>
  | DateFieldProps<TFieldValues, TName>
) & {
  type: 'text' | 'password' | 'number' | 'select' | 'date-time' | 'date';
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
    // @ts-ignore
    return <DateTimeField {...rest} />;
  }

  if (type === 'date') {
    // @ts-ignore
    return <DateField {...rest} />;
  }

  return null;
};

export default FormField;
