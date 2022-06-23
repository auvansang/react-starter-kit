import { createTheme } from '@mui/material/styles';
import { LinkBehavior } from '@sa/components';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#01579b',
    },
    secondary: {
      main: '#ff6f00',
    },
  },
  typography: {
    fontFamily: `"Noto Sans", sans-serif`,
    // fontFamily: `"Noto Sans Display", sans-serif`,
    // fontFamily: `"Noto Sans Mono", monospace`,
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
        },
      },
    },
    // MuiListItemButton: {
    //   defaultProps: {
    //     LinkComponent: LinkBehavior,
    //   },
    // },
    // MuiMenuItem: {
    //   defaultProps: {
    //     LinkComponent: LinkBehavior,
    //   },
    // },
    MuiLink: {
      defaultProps: {
        // @ts-ignore
        component: LinkBehavior,
      },
    },
    MuiIconButton: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
        disableRipple: true,
      },
    },
  },
});

export default theme;
