import { ChangeEvent, ReactNode, useEffect, useState } from 'react';

import { FormControl, FormGroup, FormHelperText, FormLabel } from '@mui/material';
import CheckboxInput from './CheckboxInput';

import { type Option } from './types';

type CheckboxGroupInputProps = {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  options: Array<Option>;
  defaultValue?: Array<string | number>;
  value?: Array<string | number>;
  direction?: 'row' | 'column';
  onChange?: (value: Array<string | number>) => void;
};

const CheckboxGroupInput = (props: CheckboxGroupInputProps) => {
  const { label, error, helperText, direction, options } = props;
  const row = direction === 'row';

  const [values, setValues] = useState<{
    [key: string | number]: boolean;
  }>(() => {
    const retValues: { [key: string]: boolean } = {};

    options.forEach((option) => {
      retValues[option.value] = props.defaultValue?.includes(option.value) ?? false;
    });

    return retValues;
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setValues({
      ...values,
      [event.target.value]: event.target.checked,
    });
  };

  useEffect(() => {
    props.onChange && props.onChange(Object.keys(values).filter((key) => values[key]));
  }, [values]);

  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <FormGroup row={row}>
        {options.map((option) => (
          <CheckboxInput
            key={option.value}
            {...option}
            checked={values[option.value]}
            onChange={handleChange}
          />
        ))}
      </FormGroup>
      {(error || helperText) && <FormHelperText sx={{ ml: 0 }}>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default CheckboxGroupInput;
