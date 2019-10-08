// Web/UI/Components/Router/useRoute.ts
import { useLocation } from 'react-router';
import { Routes, Route } from './Routes';
import { useCallback } from 'react';

export function useRoute(): Route | undefined {
  const { pathname } = useLocation();

  const findRoute = useCallback(
    (routes: Route[]): Route | undefined => {
      for (const route of routes) {
        if (route.to === pathname || route.to === pathname.replace(/\/$/, ''))
          return route;
        else if (route.children && pathname.includes(route.to))
          return findRoute(route.children);
      }
    },
    [pathname],
  );

  return findRoute(Routes);
}
