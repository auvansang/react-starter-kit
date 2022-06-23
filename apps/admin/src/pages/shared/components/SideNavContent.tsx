import { Box } from '@mui/material';

type SideNavContentProps = {
  children: React.ReactNode;
};

const SideNavContent = (props: SideNavContentProps) => {
  return (
    <Box
      component="nav"
      sx={{
        overflowX: 'hidden',
        overflowY: 'auto',
        // p: (theme) => theme.spacing(1),
      }}
    >
      {props.children}
    </Box>
  );
};

export default SideNavContent;
