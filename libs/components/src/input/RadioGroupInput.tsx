import { ReactNode } from 'react';

import { FormControl, FormHelperText, FormLabel, RadioGroup, RadioGroupProps } from '@mui/material';
import RadioInput from './RadioInput';

import { type Option } from './types';

type RadioGroupInputProps = Omit<RadioGroupProps, 'row'> & {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  options: Array<Option>;
  direction?: 'row' | 'column';
};

const RadioGroupInput = (props: RadioGroupInputProps) => {
  const { label, error, helperText, direction, ...restProps } = props;
  const row = direction === 'row';

  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup {...restProps} row={row}>
        {props.options.map((option) => (
          <RadioInput key={option.value} {...option} />
        ))}
      </RadioGroup>
      {(error || helperText) && <FormHelperText sx={{ ml: 0 }}>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default RadioGroupInput;
