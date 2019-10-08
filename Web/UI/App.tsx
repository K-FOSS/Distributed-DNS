// Web/UI/App.tsx
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { Redirect } from 'react-router';
import { useImport } from 'UI/Components/Providers/ImportProvider';
import { NavProvider } from 'UI/Components/Providers/NavProvider';
import {
  SessionProvider,
  useSession,
} from 'UI/Components/Providers/Session/SessionProvider';
import { useRoute } from 'UI/Components/Router/useRoute';
import { theme } from 'UI/Components/Styles/Theme';
import AppRouter from './Components/Router';
import { Loader } from './Components/Styles/Loader';
import { UserRole } from './GraphQL/graphqlTypes.gen';

export function AppBody(): React.ReactElement {
  const route = useRoute();
  const { roles } = useSession();

  const isAuthorized = route?.roles ? route?.roles?.every((role) => roles.includes(role)) : true

  return <>{isAuthorized ? <AppRouter /> : <Redirect to={{ pathname: roles.includes(UserRole.User) ? '/' : '/Login', state: { pathName: route?.to } }}  />}</>;
}

export function App(): React.ReactElement {
  const AppBar = useImport({
    imported: import('UI/Components/Styles/AppBar/index'),
    path: 'Components/Styles/AppBar/index.tsx',
    Loader,
  });

  const NavDrawer = useImport({
    imported: import('UI/Components/Styles/NavDrawer/index'),
    path: 'Components/Styles/NavDrawer/index.tsx',
    Loader,
  });

  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <NavProvider>
          <AppBar />
          <NavDrawer />
        </NavProvider>

        <AppBody />
        <CssBaseline />
      </ThemeProvider>
    </SessionProvider>
  );
}
