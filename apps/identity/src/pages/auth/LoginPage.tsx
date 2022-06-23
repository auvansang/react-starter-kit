import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { Stack, Typography, Button, Link } from '@mui/material';
import { EmailOutlined } from '@mui/icons-material';

import { TextInput, PasswordInput } from '@sa/components';

import env from 'env';

const RETURN_URL_SEARCH_PARAM = '?returnUrl=';
const RETURN_URL_SEARCH_PARAM_LENGTH = RETURN_URL_SEARCH_PARAM.length;

const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [returnUrl, setReturnUrl] = useState('');

  useEffect(() => {
    const returnUrlIdx = window.location.href.indexOf(RETURN_URL_SEARCH_PARAM);

    if (returnUrlIdx > 0) {
      const url = window.location.href.substring(returnUrlIdx + RETURN_URL_SEARCH_PARAM_LENGTH);

      setReturnUrl(url);
    }
  }, [window.location.href]);

  const handleChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      userName,
      password,
      returnUrl,
      button: 'login',
    };

    try {
      const response = await fetch(`${env.authority}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (response.status == 200) {
        const data = await response.json();
        console.log('response: ', data);

        window.location.href = data.returnUrl;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <Stack direction="column" spacing={1} sx={{ mb: 4 }}>
        <Typography variant="body1" color="primary">
          Sign In
        </Typography>
        <Typography variant="h5" color="primary">
          {`Let’s create something brilliant together`}
        </Typography>
      </Stack>

      <Stack direction="column" spacing={1} sx={{ mb: 3 }}>
        <TextInput
          name="userName"
          label="User Name"
          placeholder="UserName / Email"
          value={userName}
          helperText="Please enter your user name or email"
          onChange={handleChangeUserName}
          endAdornment={<EmailOutlined color="action" />}
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Password"
          helperText="Please enter your password"
          value={password}
          onChange={handleChangePassword}
        />
        <Typography
          sx={{
            textAlign: 'right',
          }}
          variant="body2"
          color="GrayText"
        >
          <Link href="/auth/forgot-password">Forgot Password?</Link>
        </Typography>
      </Stack>
      <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" name="login" type="submit">
          Sign In
        </Button>
      </Stack>
    </form>
  );
};

export default LoginPage;
