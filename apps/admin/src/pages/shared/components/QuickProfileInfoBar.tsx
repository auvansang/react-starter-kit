import { useState, MouseEvent } from 'react';

import { Avatar, Box, Button, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import avatar from 'assets/avatar.jpg';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const QuickProfileInfoBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Select Language">
        <Button onClick={handleOpen} endIcon={<Avatar alt="Remy Sharp" src={avatar} />}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'right',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bolder',
              }}
            >
              Sang
            </Typography>
            <Typography variant="caption">Full Stack Dev</Typography>
          </Box>
        </Button>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleClose}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default QuickProfileInfoBar;
