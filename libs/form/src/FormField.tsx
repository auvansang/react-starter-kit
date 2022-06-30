import { FieldPath, FieldValues } from 'react-hook-form';
import TextField, { type TextFieldProps } from './TextField';
import PasswordField, { type PasswordFieldProps } from './PasswordField';
import NumberField, { type NumberFieldProps } from './NumberField';

import SelectField, { type SelectFieldProps } from './SelectField';
import AutocompleteField, { type AutocompleteFieldProps } from './AutocompleteField';

import DateTimeField, { type DateTimeFieldProps } from './DateTimeField';
import DateField, { type DateFieldProps } from './DateField';
import TimeField, { type TimeFieldProps } from './TimeField';

import CheckboxField, { type CheckboxFieldProps } from './CheckboxField';
import CheckboxGroupField, { type CheckboxGroupFieldProps } from './CheckboxGroupField';

import RadioGroupField, { type RadioGroupFieldProps } from './RadioGroupField';

type FieldType =
  | 'text'
  | 'password'
  | 'number'
  | 'select'
  | 'date-time'
  | 'date'
  | 'time'
  | 'checkbox'
  | 'checkbox-group'
  | 'radio-group'
  | 'autocomplete';

type FieldProps<T extends FieldType, K> = {
  type: T;
} & K;

export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> =
  | FieldProps<'text', TextFieldProps<TFieldValues, TName>>
  | FieldProps<'password', PasswordFieldProps<TFieldValues, TName>>
  | FieldProps<'number', NumberFieldProps<TFieldValues, TName>>
  | FieldProps<'select', SelectFieldProps<TFieldValues, TName>>
  | FieldProps<'date-time', DateTimeFieldProps<TFieldValues, TName>>
  | FieldProps<'date', DateFieldProps<TFieldValues, TName>>
  | FieldProps<'time', TimeFieldProps<TFieldValues, TName>>
  | FieldProps<'checkbox', CheckboxFieldProps<TFieldValues, TName>>
  | FieldProps<'checkbox-group', CheckboxGroupFieldProps<TFieldValues, TName>>
  | FieldProps<'autocomplete', AutocompleteFieldProps<TFieldValues, TName>>
  | FieldProps<'radio-group', RadioGroupFieldProps<TFieldValues, TName>>;

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: FormFieldProps<TFieldValues, TName>
) => {
  const { type, ...rest } = props;

  if (type === 'text') {
    return <TextField {...(rest as TextFieldProps<TFieldValues, TName>)} />;
  }

  if (type === 'password') {
    return <PasswordField {...(rest as PasswordFieldProps<TFieldValues, TName>)} />;
  }

  if (type === 'number') {
    return <NumberField {...(rest as NumberFieldProps<TFieldValues, TName>)} />;
  }

  if (type === 'select') {
    return <SelectField {...(rest as SelectFieldProps<TFieldValues, TName>)} />;
  }

  if (type === 'date-time') {
    return <DateTimeField {...(rest as DateTimeFieldProps<TFieldValues, TName>)} />;
  }

  if (type === 'date') {
    return <DateField {...(rest as DateFieldProps<TFieldValues, TName>)} />;
  }

  if (type === 'time') {
    return <TimeField {...(rest as TimeFieldProps<TFieldValues, TName>)} />;
  }

  if (type === 'checkbox') {
    return <CheckboxField {...(rest as CheckboxFieldProps<TFieldValues, TName>)} />;
  }

  if (type === 'checkbox-group') {
    return <CheckboxGroupField {...(rest as CheckboxGroupFieldProps<TFieldValues, TName>)} />;
  }

  if (type === 'autocomplete') {
    return <AutocompleteField {...(rest as AutocompleteFieldProps<TFieldValues, TName>)} />;
  }

  if (type === 'radio-group') {
    return <RadioGroupField {...(rest as RadioGroupFieldProps<TFieldValues, TName>)} />;
  }

  return null;
};

export default FormField;
