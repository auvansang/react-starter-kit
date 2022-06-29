import { ReactNode } from 'react';

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  CheckboxProps,
} from '@mui/material';

export type CheckboxInputProps = CheckboxProps & {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
};

const CheckboxInput = (props: CheckboxInputProps) => {
  const { label, error, helperText, ...restProps } = props;

  return (
    <FormControl>
      <FormControlLabel label={label} control={<Checkbox {...restProps} />} />
      {(error || helperText) && (
        <FormHelperText error={!!error} sx={{ ml: 0 }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CheckboxInput;
