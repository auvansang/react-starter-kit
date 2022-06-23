import { lazy, useMemo } from 'react';
import { Route, useRoutes } from '@sa/router';

import NotFoundPage from 'pages/shared/NotFoundPage';

import Layout from 'pages/shared/Layout';

const SigninCallbackPage = lazy(() => import('pages/auth/SigninCallbackPage'));
const SilentCallbackPage = lazy(() => import('pages/auth/SilentCallbackPage'));

const HomePage = lazy(() => import('pages/dashboard/HomePage'));

const CategoryListPage = lazy(() => import('pages/category/CategoryListPage'));
const CategoryEditPage = lazy(() => import('pages/category/CategoryEditPage'));
const CategoryDetailsPage = lazy(() => import('pages/category/CategoryDetailsPage'));

export const ROUTES = {
  ROOT: '/',
  AUTH: {
    SIGNIN_CALLBACK: '/auth/signin-callback',
    SILENT_CALLBACK: '/auth/silent-callback',
  },
  CATEGORY: {
    ROOT: '/categories',
    CREATE: '/categories/new',
    VIEW: '/categories/:id/view',
    EDIT: '/categories/:id/edit',
  },
};

const Routes = () => {
  const routes = useMemo<Array<Route>>(
    () => [
      {
        path: ROUTES.ROOT,
        element: <Layout />,
        children: [
          {
            element: <HomePage />,
            index: true,
          },
          {
            path: ROUTES.CATEGORY.ROOT,
            element: <CategoryListPage />,
            index: true,
          },
          {
            path: ROUTES.CATEGORY.EDIT,
            element: <CategoryEditPage />,
          },
          {
            path: ROUTES.CATEGORY.VIEW,
            element: <CategoryDetailsPage />,
          },
        ],
      },
      {
        path: ROUTES.AUTH.SIGNIN_CALLBACK,
        element: <SigninCallbackPage />,
      },
      {
        path: ROUTES.AUTH.SILENT_CALLBACK,
        element: <SilentCallbackPage />,
      },
    ],
    []
  );

  return useRoutes(routes, '', NotFoundPage);
};

export default Routes;
