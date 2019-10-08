// Web/UI/Components/Router/index.tsx
// UI/UI/Components/Router/index.tsx
import React, { ReactElement } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from './Route';
import { AppRoute } from './AppRoute';
import { AppRoutes } from './AppRoutes';

function generateRoutes(
  routes: AppRoute[],
  parent = '/',
): React.ReactElement[] {
  const elements: React.ReactElement[] = [];
  for (const { path, children, exact, imported } of routes) {
    const routePath = `${parent}${path}`;

    if (children)
      elements.push(
        <Route key={path} path={routePath} imported={imported}>
          {...generateRoutes(children, `${routePath}/`)}
        </Route>,
      );
    else
      elements.push(
        <Route key={path} path={routePath} exact={exact} imported={imported} />,
      );
  }

  return elements;
}

function AppRouter(): ReactElement {
  return <Switch>{...generateRoutes(AppRoutes)}</Switch>;
}

export default AppRouter;
