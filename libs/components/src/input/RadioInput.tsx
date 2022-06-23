import { ReactNode } from 'react';

import { FormControl, FormControlLabel, FormHelperText, Radio, RadioProps } from '@mui/material';

type RadioInputProps = RadioProps & {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
};

const RadioInput = (props: RadioInputProps) => {
  const { label, error, helperText, ...restProps } = props;

  return (
    <FormControl>
      <FormControlLabel label={label} control={<Radio {...restProps} />} />
      {(error || helperText) && <FormHelperText sx={{ ml: 0 }}>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default RadioInput;
