import { ReactNode } from 'react';

import { FormControl, FormHelperText, FormLabel, Rating, RatingProps } from '@mui/material';

type RatingInputProps = RatingProps & {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
};

const RatingInput = (props: RatingInputProps) => {
  const { label, error, helperText, ...restProps } = props;

  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <Rating {...restProps} />

      {(error || helperText) && <FormHelperText sx={{ ml: 0 }}>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default RatingInput;
