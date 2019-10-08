// Web/UI/Components/Providers/ApolloProvider.tsx
import { ApolloProvider as HookApolloProvider } from '@apollo/react-hooks';
import { ApolloCache } from 'apollo-cache';
import React, { PropsWithChildren } from 'react';
import { initApollo } from 'UI/Utils/initApollo';
import { useConfig } from './ConfigProvider';
import { useToken } from './Session/useToken';
import { useSnackbar } from 'notistack';

interface ApolloProviderProps {
  cache?: ApolloCache<any>;
}

export function ApolloProvider({
  children,
  cache,
}: PropsWithChildren<ApolloProviderProps>): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();

  const { token } = useToken();

  const { baseUrl } = useConfig();

  const client = initApollo({
    cache,
    baseUrl,
    token,
    initialState:
      typeof window !== 'undefined' ? window.APP_STATE.APOLLO_STATE : {},
    onError: ({ networkError, operation: { getContext } }) => {
      if (getContext().ignoreError === true) return;
      if (networkError?.name === 'ServerParseError')
        enqueueSnackbar('API Connection Failed', {
          variant: 'error',
          persist: true,
        });
      else enqueueSnackbar('GraphQL Error', { variant: 'error' });
    },
  });

  return <HookApolloProvider client={client}>{children}</HookApolloProvider>;
}
