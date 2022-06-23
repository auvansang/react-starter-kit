import { ReactNode } from 'react';

import { FormControl, FormHelperText, FormLabel, Slider, SliderProps } from '@mui/material';

type SliderInputProps = SliderProps & {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
};

const SliderInput = (props: SliderInputProps) => {
  const { label, error, helperText, ...restProps } = props;

  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <Slider {...restProps} />

      {(error || helperText) && <FormHelperText sx={{ ml: 0 }}>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SliderInput;
