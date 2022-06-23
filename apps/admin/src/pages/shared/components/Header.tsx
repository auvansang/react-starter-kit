import { AppBar, Box, Stack, Toolbar } from '@mui/material';
import LanguageSelection from './LanguageSelection';

import QuickNotificationInfo from './QuickNotificationInfo';
import QuickProfileInfoBar from './QuickProfileInfoBar';

const Header = () => {
  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar>
        Sang
        <Box
          sx={{
            flexGrow: 1,
          }}
        />
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <LanguageSelection />
          <QuickNotificationInfo />
          <QuickProfileInfoBar />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
