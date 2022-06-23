import { Box, LinearProgress } from '@mui/material';

const TopLoading = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: '100%',
      }}
    >
      <LinearProgress color="secondary" />
    </Box>
  );
};

TopLoading.displayName = 'TopLoading';

export default TopLoading;
