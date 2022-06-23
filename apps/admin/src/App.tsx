import 'assets/scss/app.scss';

import '@fontsource/noto-sans';
import '@fontsource/noto-sans-display';
import '@fontsource/noto-sans-mono';

import { StrictMode, Suspense, useEffect } from 'react';

import { I18nProvider } from '@sa/i18n';
import { ThemeProvider, TopLoading } from '@sa/components';
import { Router } from '@sa/router';

import { initialRootState, RootStoreEnv, RootStoreProvider } from 'stores';
import i18n from 'i18n';

import theme from './themes';
import Routes from 'pages/shared/Routes';
// import { applyBearerTokenInterceptor, applyRefreshBearerTokenInterceptor } from '@sa/http';
import { getEnv } from '@sa/store';

const App = () => {
  useEffect(() => {
    const { http } = getEnv<RootStoreEnv>(initialRootState);

    // applyBearerTokenInterceptor(http, async () =>
    //   Promise.resolve(initialRootState.authStore.accessToken)
    // );

    // applyRefreshBearerTokenInterceptor(http, async () => {
    //   await initialRootState.authStore.signinSilentAsync();

    //   return Promise.resolve(initialRootState.authStore.accessToken);
    // });
  }, []);

  return (
    <StrictMode>
      <RootStoreProvider value={initialRootState}>
        <I18nProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <Router>
              <Suspense fallback={<TopLoading />}>
                <Routes />
              </Suspense>
            </Router>
          </ThemeProvider>
        </I18nProvider>
      </RootStoreProvider>
    </StrictMode>
  );
};

export default App;
