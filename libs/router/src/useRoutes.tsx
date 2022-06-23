import generateRoutes, { type Route } from 'generateRoutes';
import { useMemo } from 'react';
import { useRoutes as useBaseRoutes } from 'react-router';

const useRoutes = (
  routes: Array<Route>,
  unAuthorizedPath: string,
  getFallbackPage: () => JSX.Element,
  isAuthenticated?: () => boolean
) => {
  const generatedRoutes = useMemo(() => {
    const _routes = generateRoutes(routes, unAuthorizedPath, isAuthenticated);

    _routes.push({
      path: '*',
      element: getFallbackPage(),
    });

    return _routes;
  }, [routes, unAuthorizedPath]);

  return useBaseRoutes(generatedRoutes);
};

export default useRoutes;
