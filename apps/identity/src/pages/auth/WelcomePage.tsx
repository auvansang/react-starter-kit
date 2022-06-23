import { Stack, Typography } from '@mui/material';

const WelcomePage = () => {
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h6" color="primary">
        Welcome to VK Link Identity Server
      </Typography>
    </Stack>
  );
};

export default WelcomePage;
