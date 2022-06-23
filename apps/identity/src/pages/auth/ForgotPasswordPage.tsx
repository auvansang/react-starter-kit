import { Stack, Typography, Button, InputAdornment } from '@mui/material';
import { EmailOutlined } from '@mui/icons-material';

import { TextInput } from '@sa/components';

const ForgotPasswordPage = () => {
  return (
    <>
      <Stack direction="column" spacing={1} sx={{ mb: 4 }}>
        <Typography variant="body1" color="primary">
          Forgot Password
        </Typography>
        <Typography variant="h5" color="primary">
          {`Enter your email associated with your account.`}
        </Typography>
        <Typography variant="body1">
          {`We will email you a link to reset your password.`}
        </Typography>
      </Stack>

      <Stack direction="column" spacing={2} sx={{ mb: 4 }}>
        <TextInput
          name="email"
          label="Email"
          placeholder="Email"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailOutlined color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack direction="column" spacing={2} sx={{ mb: 4 }}>
        <Button variant="contained" color="primary">
          Send
        </Button>
      </Stack>
    </>
  );
};

export default ForgotPasswordPage;
