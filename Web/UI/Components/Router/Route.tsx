// Web/UI/Components/Router/Route.tsx
import React, { PropsWithChildren } from 'react';
import { Route as RouteComponent } from 'react-router-dom';
import { useImport } from '../Providers/ImportProvider';
import { Loader } from '../Styles/Loader';

export interface ImportedRouteInput {
  imported: Promise<{ default: () => React.ReactElement }>;
  path: string;
}

interface RouteProps {
  imported?: ImportedRouteInput;
  path: string;
  exact?: boolean;
}

function Loadable({
  imported,
}: {
  imported?: ImportedRouteInput;
}): React.ReactElement {
  const Component = useImport({
    imported: imported?.imported || import('UI/Routes/Error'),
    path: imported?.path || 'Routes/Error/index.tsx',
    Loader,
  });

  return <Component />;
}

export function Route({
  imported,
  children,
  path,
  exact = false,
}: PropsWithChildren<RouteProps>): React.ReactElement {
  if (children)
    return (
      <RouteComponent path={path}>
        <RouteComponent path={`${path}/`} exact>
          <Loadable imported={imported} />
        </RouteComponent>

        {children}
      </RouteComponent>
    );

  return (
    <RouteComponent exact={exact} path={path}>
      <Loadable imported={imported} />
    </RouteComponent>
  );
}
