import { createTheme as createThemeBase, ThemeOptions } from '@mui/material/styles';

import baseThemeOptions from './baseThemeOptions';

const createTheme = (options: ThemeOptions) => createThemeBase(baseThemeOptions, options);

export default createTheme;
