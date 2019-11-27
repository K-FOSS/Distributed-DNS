// Web/UI/Components/Router/useRoute.ts
import { useLocation } from 'react-router-dom';
import { Routes, Route } from './Routes';
import { useCallback } from 'react';

export function useRoute(): Route | undefined {
  const { pathname } = useLocation();

  const findRoute = useCallback(
    (routes: Route[]): Route | undefined => {
      for (const route of routes) {
        const routePath = new RegExp(route.to);

        if (
          route.to === pathname ||
          routePath.test(pathname.replace(/\/$/, ''))
        )
          return route;
        else if (route.children && pathname.includes(route.to))
          return findRoute(route.children);
      }
    },
    [pathname],
  );

  return findRoute(Routes);
}
