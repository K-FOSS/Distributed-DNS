// Web/UI/Utils/initApollo.ts
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import {
  NormalizedCacheObject,
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloCache } from 'apollo-cache';
import fetch from 'isomorphic-unfetch';
import { onError as onErrorLink, ErrorHandler } from 'apollo-link-error';

import introspectionResult from 'UI/GraphQL/introspection-result.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionResult,
});

interface InitClientParams {
  baseUrl: string;
  initialState?: NormalizedCacheObject;
  token?: string;
  cache?: ApolloCache<NormalizedCacheObject>;
  onError?: ErrorHandler;
}

export function initApollo({
  baseUrl,
  initialState,
  token,
  cache = new InMemoryCache({ fragmentMatcher }).restore(initialState || {}),
  onError = () => console.log('Error'),
}: InitClientParams): ApolloClient<NormalizedCacheObject> {
  const errorLink = onErrorLink(onError);
  const link = createHttpLink({
    uri: `${baseUrl}/graphql`,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    fetch,
  });

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: errorLink.concat(link),
    cache: cache,
  });
}
