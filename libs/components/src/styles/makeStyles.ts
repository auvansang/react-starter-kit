import useTheme from '@mui/material/styles/useTheme';

import { createMakeAndWithStyles } from 'tss-react';

const { makeStyles } = createMakeAndWithStyles({
  useTheme,
});

export default makeStyles;
