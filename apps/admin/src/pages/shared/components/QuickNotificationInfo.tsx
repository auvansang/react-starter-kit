import { useState } from 'react';

import {
  Alert,
  AlertTitle,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  DoneAllOutlined,
  DoneOutlined,
  NotificationsActiveOutlined,
  NotificationsOutlined,
} from '@mui/icons-material';

const QuickNotificationInfo = () => {
  const [open, setOpen] = useState(false);
  const [numberOfNewNotifications] = useState(1);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Tooltip title="Open Notification Bar">
        <IconButton onClick={handleToggle}>
          <Badge badgeContent={numberOfNewNotifications} color="secondary">
            {numberOfNewNotifications > 0 ? (
              <NotificationsActiveOutlined
                sx={{
                  animation: `tilt-shaking 0.25s`,
                  animationIterationCount: 'infinite',
                }}
              />
            ) : (
              <NotificationsOutlined />
            )}
          </Badge>
        </IconButton>
      </Tooltip>
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={handleToggle}
        BackdropProps={{ invisible: true }}
        sx={{
          zIndex: (theme) => theme.zIndex.appBar - 1,
          overflowY: 'hidden',
        }}
      >
        <Toolbar />
        <Stack
          direction="column"
          sx={{
            overflowY: 'hidden',
            height: (theme) => `calc(100vh  - ${theme.mixins.toolbar.minHeight}px - 2px)`,
          }}
        >
          <Stack
            direction="row"
            sx={{
              p: 2,
            }}
            justifyContent="center"
            alignItems="center"
          >
            <Box sx={{ mr: 'auto' }}>
              <Typography variant="h6">Notifications</Typography>
              <Typography variant="body1" color="GrayText">
                You have 8 new notifcations
              </Typography>
            </Box>
            <Tooltip title="Make all notifications as read">
              <IconButton color="success">
                <DoneAllOutlined />
              </IconButton>
            </Tooltip>
          </Stack>
          <Divider />
          <Stack
            direction="column"
            spacing={1}
            sx={{
              overflowX: 'auto',
              p: 2,
            }}
          >
            <Alert severity="info" variant="outlined">
              <AlertTitle>Info</AlertTitle>
              This is a basic alert—check it out!
            </Alert>
            <Alert
              severity="success"
              action={
                <Tooltip title="Make this notification as read">
                  <IconButton color="success">
                    <DoneOutlined />
                  </IconButton>
                </Tooltip>
              }
            >
              <AlertTitle>Success</AlertTitle>
              This is a success message
            </Alert>
            <Alert severity="warning" variant="outlined">
              <AlertTitle>Warning</AlertTitle>
              This is a warning message
            </Alert>
            <Alert severity="error" variant="outlined">
              <AlertTitle>Error</AlertTitle>
              This is an error message
            </Alert>
            <Alert severity="info" variant="outlined">
              <AlertTitle>Info</AlertTitle>
              This is a basic alert—check it out!
            </Alert>
            <Alert
              severity="success"
              action={
                <Tooltip title="Make this notification as read">
                  <IconButton color="success">
                    <DoneOutlined />
                  </IconButton>
                </Tooltip>
              }
            >
              <AlertTitle>Success</AlertTitle>
              This is a success message
            </Alert>
            <Alert severity="warning" variant="outlined">
              <AlertTitle>Warning</AlertTitle>
              This is a warning message
            </Alert>
            <Alert severity="error" variant="outlined">
              <AlertTitle>Error</AlertTitle>
              This is an error message
            </Alert>
            <Alert severity="info" variant="outlined">
              <AlertTitle>Info</AlertTitle>
              This is a basic alert—check it out!
            </Alert>
            <Alert
              severity="success"
              action={
                <Tooltip title="Make this notification as read">
                  <IconButton color="success">
                    <DoneOutlined />
                  </IconButton>
                </Tooltip>
              }
            >
              <AlertTitle>Success</AlertTitle>
              This is a success message
            </Alert>
          </Stack>
          <Divider sx={{ flexGrow: 1 }} />
          <Box sx={{ px: 2, py: 1 }}>
            <Button fullWidth variant="text">
              Show all notifications
            </Button>
          </Box>
        </Stack>
      </Drawer>
    </>
  );
};

export default QuickNotificationInfo;
