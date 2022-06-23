import { forwardRef, ReactNode, Ref, useId, useMemo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';

import Input, { type InputProps } from './Input';

export interface HorizontalInputProps extends InputProps {
  label?: ReactNode;
  labelId?: string;
  labelAlign?: 'left' | 'right';
  labelCol?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  labelPadding?: number;
  helperText?: ReactNode;
  sx?: BoxProps['sx'];
}

const HorizontalInput = forwardRef((props: HorizontalInputProps, ref?: Ref<HTMLDivElement>) => {
  const autoId = useId();
  const {
    id = autoId,
    label,
    labelId,
    labelAlign = 'left',
    labelPadding = 2,
    labelCol = 3,
    helperText = ' ',
    sx,
    ...restInputProps
  } = props;
  const inputCol = useMemo(() => 12 - labelCol, [labelCol]);

  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" sx={sx}>
      <Box gridColumn={`span ${labelCol}`}>
        {label && (
          <InputLabel
            id={labelId}
            htmlFor={id}
            disabled={props.disabled}
            error={props.error}
            required={props.required}
            sx={{
              textAlign: labelAlign,
              paddingRight: labelPadding,
              lineHeight: '1.5rem',
            }}
          >
            {label}
          </InputLabel>
        )}
      </Box>
      <Box
        gridColumn={`span ${inputCol}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
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
      </Box>
    </Box>
  );
});

HorizontalInput.displayName = 'HorizontalInput';

export default HorizontalInput;
