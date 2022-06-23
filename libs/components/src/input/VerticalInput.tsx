import { forwardRef, ReactNode, Ref, useId } from 'react';

import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Stack, { type StackProps } from '@mui/material/Stack';

import Input, { type InputProps } from './Input';

export interface VerticalInputProps extends InputProps {
  label?: ReactNode;
  labelId?: string;
  helperText?: ReactNode;
  sx?: StackProps['sx'];
}

const VerticalInput = forwardRef((props: VerticalInputProps, ref?: Ref<HTMLDivElement>) => {
  const autoId = useId();
  const { id = autoId, label, labelId, helperText = ' ', sx, ...restInputProps } = props;

  return (
    <Stack direction="column" spacing={0.5} sx={sx}>
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

VerticalInput.displayName = 'VerticalInput';

export default VerticalInput;
