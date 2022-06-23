import { FieldPath, FieldValues } from 'react-hook-form';
import TextField, { type TextFieldProps } from './TextField';
import PasswordField, { type PasswordFieldProps } from './PasswordField';
import NumberField, { type NumberFieldProps } from './NumberField';

export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = (
  | TextFieldProps<TFieldValues, TName>
  | PasswordFieldProps<TFieldValues, TName>
  | NumberFieldProps<TFieldValues, TName>
) & {
  type: 'text' | 'password' | 'number';
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

  return null;
};

export default FormField;
