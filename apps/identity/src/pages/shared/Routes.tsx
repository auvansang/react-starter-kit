import { lazy, useMemo } from 'react';
import { Route, useRoutes } from '@sa/router';

import NotFoundPage from 'pages/shared/NotFoundPage';

import AuthLayout from 'pages/auth/AuthLayout';

const WelcomePage = lazy(() => import('pages/auth/WelcomePage'));
const LoginPage = lazy(() => import('pages/auth/LoginPage'));
const LogoutPage = lazy(() => import('pages/auth/LogoutPage'));

const ForgotPasswordPage = lazy(() => import('pages/auth/ForgotPasswordPage'));

export const ROUTES = {
  ROOT: '/',
  NOT_FOUND: '*',
  AUTH: {
    ROOT: '/auth',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
};

const Routes = () => {
  const routes = useMemo<Array<Route>>(
    () => [
      {
        path: ROUTES.ROOT,
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.AUTH.ROOT,
            element: <WelcomePage />,
            secure: true,
          },
          {
            path: ROUTES.AUTH.LOGIN,
            element: <LoginPage />,
          },
          {
            path: ROUTES.AUTH.LOGOUT,
            element: <LogoutPage />,
          },
          {
            path: ROUTES.AUTH.FORGOT_PASSWORD,
            element: <ForgotPasswordPage />,
          },
        ],
      },
    ],
    []
  );

  return useRoutes(routes, ROUTES.AUTH.LOGIN, NotFoundPage);
};

export default Routes;
