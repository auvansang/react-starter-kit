import { forwardRef, type Ref } from 'react';
import { Input as UnderlinedInput } from '@mui/material';
import { type InputBaseProps } from '@mui/material/InputBase';
import OutlinedInput from '@mui/material/OutlinedInput';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';

export interface InputProps extends Omit<InputBaseProps, 'sx' | 'ref'> {
  variant?: 'filled' | 'outlined' | 'underlined';
}

const Input = forwardRef((props: InputProps, ref?: Ref<HTMLDivElement>) => {
  const {
    size = 'small',
    variant = 'outlined',
    startAdornment,
    endAdornment,
    ...inputProps
  } = props;

  const inputPropsCopy =
    variant === 'filled' ? { ...inputProps, hiddenLabel: true } : { ...inputProps };

  let InputComponent = OutlinedInput;

  if (variant === 'filled') {
    InputComponent = FilledInput;
  } else if (variant === 'underlined') {
    InputComponent = UnderlinedInput;
  }

  return (
    <InputComponent
      ref={ref}
      size={size}
      startAdornment={
        startAdornment && (
          <InputAdornment
            position="start"
            sx={{
              '& > button': {
                marginLeft: -1,
              },
            }}
          >
            {startAdornment}
          </InputAdornment>
        )
      }
      endAdornment={
        endAdornment && (
          <InputAdornment
            position="end"
            sx={{
              '& > button': {
                marginRight: -1,
              },
            }}
          >
            {endAdornment}
          </InputAdornment>
        )
      }
      {...inputPropsCopy}
    />
  );
});

Input.displayName = 'Input';

export default Input;
