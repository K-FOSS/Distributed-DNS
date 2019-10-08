// Web/UI/Client.tsx
import React, { PropsWithChildren } from 'react';
import { CookiesProvider } from 'react-cookie';
import { hydrate, render as ReactDOMRender } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import prepass from 'react-ssr-prepass';
import { ApolloProvider } from './Components/Providers/ApolloProvider';
import { ConfigProvider } from './Components/Providers/ConfigProvider';
import {
  ImportItem,
  ImportProvider,
} from './Components/Providers/ImportProvider';
import { App } from './App';
import { SnackbarProvider } from 'notistack';

window.setImmediate = window.setTimeout;

export let imports: ImportItem[] = [];

function CoreApp({ children }: PropsWithChildren<{}>): React.ReactElement {
  return (
    <BrowserRouter>
      <ImportProvider imports={imports}>
        <ConfigProvider {...window.APP_STATE.CONFIG}>
          <CookiesProvider>
            <SnackbarProvider>
              <ApolloProvider>{children}</ApolloProvider>
            </SnackbarProvider>
          </CookiesProvider>
        </ConfigProvider>
      </ImportProvider>
    </BrowserRouter>
  );
}

async function render(
  renderFunction: import('react-dom').Renderer,
): Promise<void> {
  imports = [];
  const MainApp = (
    <CoreApp>
      <App />
    </CoreApp>
  );

  await prepass(MainApp);
  for (const { promise } of imports) await promise;
  await prepass(MainApp);
  for (const { promise } of imports) await promise;

  renderFunction(MainApp, document.getElementById('app'));
}

render(hydrate);

const hot = module.hot;
if (hot && hot.accept)
  hot.accept(async () => {
    imports = [];
    render(ReactDOMRender);
  });
