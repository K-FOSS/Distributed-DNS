// Web/UI/Components/Providers/ConfigProvider.tsx
import { AppConfiguration } from 'Server/Configuration';
import React, { createContext, PropsWithChildren, useContext } from 'react';

const ConfigContext = createContext<AppConfiguration>({
  baseUrl: 'http://localhost',
});

export function ConfigProvider({
  children,
  ...config
}: PropsWithChildren<AppConfiguration>): React.ReactElement {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}

export function useConfig(): AppConfiguration {
  return useContext(ConfigContext);
}
