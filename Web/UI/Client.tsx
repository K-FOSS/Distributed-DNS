// Web/UI/Client.tsx
import React, { PropsWithChildren } from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM, { Renderer } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import prepass from 'react-ssr-prepass';
import { ApolloProvider } from './Components/Providers/ApolloProvider';
import { ConfigProvider } from './Components/Providers/ConfigProvider';
import {
  ImportItem,
  ImportProvider,
} from './Components/Providers/ImportProvider';
import { SnackbarProvider } from 'notistack';

window.setImmediate = window.setTimeout;

export let imports: ImportItem[] = [];

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', async function() {
    const worker = await navigator.serviceWorker.register(
      '/service-worker.ts',
      { scope: '/' },
    );
    console.log('SW registered: ', worker);
  });
}

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

async function render(renderFunction: Renderer) {
  imports = [];
  const { App } = await import('UI/App');
  const MainApp = (
    <CoreApp>
      <App />
    </CoreApp>
  );

  try {
    await prepass(MainApp);
    for (const { promise } of imports) await promise;
    await prepass(MainApp);
    for (const { promise } of imports) await promise;
  } catch {
    console.log('Error during prerender of client');
  }

  renderFunction(MainApp, document.getElementById('app'));
}

render(ReactDOM.hydrate);

const hot = (module as any).hot;
if (hot && hot.accept) {
  hot.accept(() => {
    render(ReactDOM.render);
  });
}
