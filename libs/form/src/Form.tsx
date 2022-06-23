import { ReactNode } from 'react';

import { FieldPath, FieldValues, UseFormProps, useForm, SubmitHandler } from 'react-hook-form';

import { DevTool, PLACEMENT } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';

import { object, AnySchema } from 'yup';

import { Button, Stack } from '@mui/material';

import FormField, { type FormFieldProps } from './FormField';

type FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = any
> = UseFormProps<TFieldValues, TContext> & {
  onSubmit: SubmitHandler<TFieldValues>;
  fields: Array<FormFieldProps<TFieldValues, TName>>;
  validateSchema?: { [fieldName in keyof TFieldValues]: AnySchema };
  actions?: Array<{
    label: ReactNode;
    type: 'submit' | 'reset' | 'button';
  }>;
  fieldProps: {
    layout?: 'vertical' | 'horizontal' | 'inline';
    labelAlign?: 'left' | 'right';
    labelCol?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    labelPadding?: number;
  };
  useDevTool?: boolean;
  devToolPlacement?: PLACEMENT;
};

const Form = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = any
>(
  props: FormProps<TFieldValues, TName, TContext>
) => {
  const {
    onSubmit,
    fields,
    actions,
    validateSchema,
    useDevTool,
    devToolPlacement,
    fieldProps,
    ...rest
  } = props;

  const { control, handleSubmit } = useForm({
    ...rest,
    resolver: yupResolver(
      object<TFieldValues>()
        .shape({ ...validateSchema })
        .defined()
    ),
  });

  return (
    <Stack direction="column" spacing={1.5} component="form" onSubmit={handleSubmit(onSubmit)}>
      {fields &&
        fields.map((field) => (
          <FormField key={field.name} {...fieldProps} {...field} control={control} />
        ))}

      <Stack direction="row" spacing={2}>
        {actions &&
          actions.map((action) => {
            return (
              <Button key={action.type} type={action.type}>
                {action.label}
              </Button>
            );
          })}
      </Stack>

      {process.env.NODE_ENV === 'development' && useDevTool && (
        // @ts-ignore
        <DevTool control={control} placement={devToolPlacement} />
      )}
    </Stack>
  );
};

export default Form;
