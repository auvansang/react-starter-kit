import { ThemeOptions } from '@mui/material/styles';
import LinkBehavior from 'link/LinkBehavior';

const baseThemeOptions: ThemeOptions = {
  typography: {
    // fontFamily: '"Noto Sans Display", sans-serif;',
    // fontWeightLight: 300,
    // fontWeightRegular: 400,
    // fontWeightMedium: 500,
    // fontWeightBold: 700,
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
      },
    },
  },
};

export default baseThemeOptions;
