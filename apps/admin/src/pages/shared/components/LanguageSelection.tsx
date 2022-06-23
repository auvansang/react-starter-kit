import { useState, MouseEvent } from 'react';

import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { TranslateOutlined } from '@mui/icons-material';

const LanguageSelection = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Select Language">
        <IconButton onClick={handleClick}>
          <TranslateOutlined />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>English</MenuItem>
        <MenuItem onClick={handleClose}>Vietnamese</MenuItem>
      </Menu>
    </>
  );
};

export default LanguageSelection;
