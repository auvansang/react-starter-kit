import { type RouteObject } from 'react-router';

import SecurePageWrapper from './SecurePageWrapper';

export interface Route extends Omit<RouteObject, 'children'> {
  secure?: boolean;
  children?: Array<Route>;
}

const generateRoutes = (
  routes: Array<Route>,
  unAuthorizedPath: string,
  isAuthenticated?: () => boolean
): Array<RouteObject> =>
  routes.map((route) => {
    const { secure, children, ...restRoute } = route;

    if (secure && !!isAuthenticated) {
      return {
        ...restRoute,
        element: (
          <SecurePageWrapper isAuthenticated={isAuthenticated} unAuthorizedPath={unAuthorizedPath}>
            {restRoute.element}
          </SecurePageWrapper>
        ),
      };
    }

    if (children) {
      return {
        ...restRoute,
        children: generateRoutes(children, unAuthorizedPath, isAuthenticated),
      };
    }

    return route;
  });

export default generateRoutes;
