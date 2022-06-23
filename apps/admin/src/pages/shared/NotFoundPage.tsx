import { Box, Link } from '@mui/material';

import logo from 'assets/logo.png';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Link href="/">
          <Box
            sx={{
              mb: 8,
              height: 84,
              backgroundImage: `url(${logo})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              backgroundSize: 'contain',
            }}
          ></Box>
        </Link>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
