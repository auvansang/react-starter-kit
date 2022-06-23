import { Box, Stack } from '@mui/material';

type SideNavFooterProps = {
  version: string;
};

const SideNavFooter = (props: SideNavFooterProps) => {
  return (
    <Stack direction="row" spacing={2}>
      <Box>v{props.version}</Box>
    </Stack>
  );
};

export default SideNavFooter;
