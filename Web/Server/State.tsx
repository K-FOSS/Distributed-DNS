// Web/Server/State.tsx
import React from 'react';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { AppConfiguration } from 'Server/Configuration';
import { renderToNodeStream } from 'react-dom/server';

export interface AppState {
  PROPS: {};
  APOLLO_STATE: NormalizedCacheObject;
  CONFIG: AppConfiguration;
}

interface AppStateScriptProps {
  state: AppState;
}

export function AppStateScript({
  state,
}: AppStateScriptProps): React.ReactElement {
  return (
    <script
      type='text/javascript'
      dangerouslySetInnerHTML={{
        __html: `window.APP_STATE = ${JSON.stringify(state)}`,
      }}
    />
  );
}

export function renderAppStateScriptStreams(
  state: AppState,
): NodeJS.ReadableStream {
  return renderToNodeStream(<AppStateScript state={state} />);
}
