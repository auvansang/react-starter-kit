import { useState, MouseEvent, forwardRef, Ref } from 'react';

import IconButton from '@mui/material/IconButton';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';

import TextInput, { TextInputProps } from './TextInput';

export type PasswordInputProps = Omit<TextInputProps, 'type'>;

const PasswordInput = forwardRef((props: PasswordInputProps, ref?: Ref<HTMLDivElement>) => {
  const [showPassword, setShowPassword] = useState(false);
  const { endAdornment, ...restProps } = props;

  const handleToggleShowPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setShowPassword(!showPassword);
  };

  return (
    <TextInput
      {...restProps}
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      endAdornment={
        <>
          <IconButton onClick={handleToggleShowPassword}>
            {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
          </IconButton>
          {endAdornment}
        </>
      }
    />
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
