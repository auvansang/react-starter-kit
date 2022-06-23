import { StrictMode, Suspense } from 'react';

import { I18nProvider } from '@sa/i18n';
import { Router } from '@sa/router';

import { ThemeProvider, TopLoading } from '@sa/components';

import i18n from './i18n';
import { lightTheme } from './themes';

import Routes from './pages/shared/Routes';

const App = () => {
  return (
    <StrictMode>
      <I18nProvider i18n={i18n}>
        <ThemeProvider theme={lightTheme}>
          <Router>
            <Suspense fallback={<TopLoading />}>
              <Routes />
            </Suspense>
          </Router>
        </ThemeProvider>
      </I18nProvider>
    </StrictMode>
  );
};

export default App;
