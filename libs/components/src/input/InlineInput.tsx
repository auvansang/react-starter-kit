import { forwardRef, ReactNode, Ref, useId } from 'react';

import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Stack, { type StackProps } from '@mui/material/Stack';

import Input, { type InputProps } from './Input';

export interface InlineInputProps extends InputProps {
  label?: ReactNode;
  labelId?: string;
  helperText?: ReactNode;
  sx?: StackProps['sx'];
}

const InlineInput = forwardRef((props: InlineInputProps, ref?: Ref<HTMLDivElement>) => {
  const autoId = useId();
  const { id = autoId, label, labelId, helperText = ' ', sx, ...restInputProps } = props;

  return (
    <Stack direction="row" spacing={0.5} sx={sx}>
      {label && (
        <InputLabel
          id={labelId}
          htmlFor={id}
          disabled={props.disabled}
          error={props.error}
          required={props.required}
          sx={{
            lineHeight: '1.5rem',
          }}
        >
          {label}
        </InputLabel>
      )}
      <Stack direction="column">
        <Input id={id} ref={ref} {...restInputProps} />
        {helperText && (
          <FormHelperText
            disabled={props.disabled}
            error={props.error}
            required={props.required}
            sx={{
              lineHeight: '1.25rem',
            }}
          >
            {helperText}
          </FormHelperText>
        )}
      </Stack>
    </Stack>
  );
});

InlineInput.displayName = 'InlineInput';

export default InlineInput;
