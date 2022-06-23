import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import { Theme, ThemeProvider as BaseThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useMemo } from 'react';
import { CssBaseline } from '@mui/material';

type Props = {
  children: React.ReactNode;
  theme: Theme;
  prefix?: string;
};

const ThemeProvider = (props: Props) => {
  const cache = useMemo(
    () =>
      createCache({
        key: props.prefix ?? 'sisa',
        prepend: true,
      }),
    [props.prefix]
  );

  return (
    <CacheProvider value={cache}>
      <BaseThemeProvider theme={props.theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>{props.children}</LocalizationProvider>
      </BaseThemeProvider>
    </CacheProvider>
  );
};

export default ThemeProvider;
