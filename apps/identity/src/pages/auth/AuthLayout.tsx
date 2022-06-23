import { Outlet } from '@sa/router';
import { Grid, Box, Paper, Link, Typography } from '@mui/material';
import background from 'assets/background.jpg';
import logo from 'assets/logo.png';

const AuthLayout = () => {
  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={5}
        md={7}
        sx={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></Grid>
      <Grid
        item
        xs={12}
        sm={7}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            flex: 1,
            px: {
              xs: 2,
              md: 4,
            },
          }}
        >
          <Link href="/">
            <Box
              sx={{
                mb: {
                  md: 8,
                  sm: 6,
                },
                height: 84,
                backgroundImage: `url(${logo})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'contain',
              }}
            ></Box>
          </Link>

          <Outlet />

          <Typography
            sx={{
              textAlign: 'center',
              mt: 4,
            }}
            variant="body2"
            color="GrayText"
          >
            <Link href="/">Policy privacy</Link> and <Link href="/">Terms of Use</Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
