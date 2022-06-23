import { useState } from 'react';

import { Divider, Drawer } from '@mui/material';
import type { CSSObject, Theme } from '@mui/material/styles';

import { makeStyles } from '@sa/components';

import SideNavHeader from './SideNavHeader';
import SideNavContent from './SideNavContent';
import SideNavMenu from './SideNavMenu';
import type { SideNavMenuItemProps } from './SideNavMenuItem';
import SideNavFooter from './SideNavFooter';

const sideNavOpenedMixin = (theme: Theme): CSSObject => ({
  width: `calc(${theme.spacing(30)} + 1px)`,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const sideNavClosedMixin = (theme: Theme, expand: boolean): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(expand ? 30 : 8)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(expand ? 30 : 9)} + 1px)`,
  },
});

const useStyles = makeStyles<{ open: boolean; expand: boolean }>()((theme, { open, expand }) => ({
  sideNav: {
    width: theme.spacing(30),
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    // position: expand ? 'absolute' : 'relative',
    // Workaround for issue Property '@font-face' is incompatible with index signature,
    // see https://github.com/garronej/tss-react/issues/50
    ...(theme.mixins.toolbar as CSSObject),
    ...(open && {
      ...sideNavOpenedMixin(theme),
      '& .MuiDrawer-paper': {
        ...sideNavOpenedMixin(theme),
        borderRight: `1px dashed ${theme.palette.divider}`,
      },
    }),
    ...(!open && {
      ...sideNavClosedMixin(theme, expand),
      '& .MuiDrawer-paper': {
        ...sideNavClosedMixin(theme, expand),
        borderRight: `1px dashed ${theme.palette.divider}`,
      },
    }),
  },
}));

type SideNavProps = {
  items: Array<SideNavMenuItemProps>;
  open: boolean;
  version: string;
};

const SideNav = (props: SideNavProps) => {
  const [open, setOpen] = useState(props.open);
  const [expand, setExpand] = useState(open);
  const { classes } = useStyles({ open, expand });

  const toggleSideNav = () => {
    setOpen(!open);
  };

  const onMouseEnter = () => {
    if (open) {
      return;
    }
    setExpand(true);
  };

  const onMouseLeave = () => {
    if (open) {
      return;
    }

    setExpand(false);
  };

  return (
    <Drawer
      open={open}
      anchor="left"
      variant="permanent"
      className={classes.sideNav}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <SideNavHeader toggleSideNav={toggleSideNav} expand={expand} open={open}>
        Sisa
      </SideNavHeader>
      <SideNavContent>
        <SideNavMenu items={props.items} minimized={!expand} />
      </SideNavContent>
      <Divider
        sx={{
          flexGrow: 1,
        }}
      />
      <SideNavFooter version={props.version} />
    </Drawer>
  );
};

export default SideNav;
