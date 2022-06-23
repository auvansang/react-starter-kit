import { Box, IconButton } from '@mui/material';
import type { CSSObject } from '@mui/material/styles';

import { KeyboardDoubleArrowLeftOutlined } from '@mui/icons-material';
import { makeStyles } from '@sa/components';

type LogoProps = {
  children?: React.ReactNode;
  open: boolean;
  expand: boolean;
  toggleSideNav: () => void;
};

const useStyles = makeStyles<{ open: boolean }>()((theme, { open }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
    // Workaround for issue Property '@font-face' is incompatible with index signature,
    // see https://github.com/garronej/tss-react/issues/50
    ...(theme.mixins.toolbar as CSSObject),
  },
  toggleIcon: {
    transform: `rotate(${open ? 0 : 180}deg)`,
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
  },
}));

const SideNavHeader = (props: LogoProps) => {
  const { classes } = useStyles({ open: props.open });

  return (
    <Box className={classes.root}>
      <Box
        sx={{
          mr: 'auto',
        }}
      >
        {props.children}
      </Box>
      {(props.open || props.expand) && (
        <IconButton onClick={props.toggleSideNav} className={classes.toggleIcon}>
          <KeyboardDoubleArrowLeftOutlined />
        </IconButton>
      )}
    </Box>
  );
};

export default SideNavHeader;
