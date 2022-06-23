import { ReactNode } from 'react';

import { FormControl, FormControlLabel, FormHelperText, Switch, SwitchProps } from '@mui/material';

type SwitchInputProps = SwitchProps & {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
};

const SwitchInput = (props: SwitchInputProps) => {
  const { label, error, helperText, ...restProps } = props;

  return (
    <FormControl>
      <FormControlLabel label={label} control={<Switch {...restProps} />} />
      {(error || helperText) && <FormHelperText sx={{ ml: 0 }}>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SwitchInput;
