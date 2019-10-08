// UI/server/initApollo.ts
// KristianFJones <me@kristianjones.xyz>
// Creates the Apollo Client Connection to backend from UI Server
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { OperationDefinitionNode } from 'graphql';
import fetch from 'isomorphic-unfetch';
import { createHttpLink } from 'apollo-link-http';

interface InitApolloArgs {
  token?: string;
  URL: string;
}

export const initApollo = ({ token, URL }: InitApolloArgs): ApolloClient<any> => {
  const httpLink = createHttpLink({
    uri: URL,
    fetch
  });

  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: URL,
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: {
        authToken: token
      }
    },
    webSocketImpl: require('ws')
  });

  const terminatingLink = split(
    ({ query: { definitions } }) =>
      definitions.some(node => {
        const { kind, operation } = node as OperationDefinitionNode;
        return kind === 'OperationDefinition' && operation === 'subscription';
      }),
    wsLink,
    httpLink
  );

  const link = ApolloLink.from([terminatingLink]);

  return new ApolloClient({
    link: link,
    cache: new InMemoryCache()
  });
};
