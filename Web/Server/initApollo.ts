// UI/server/initApollo.ts
// KristianFJones <me@kristianjones.xyz>
// Creates the Apollo Client Connection to backend from UI Server
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';

const cache = new InMemoryCache();

const APIHost = process.env.API_HOST || 'localhost';

export const initApollo = (): ApolloClient<any> =>
  new ApolloClient({
    link: createHttpLink({
      uri: `http://${APIHost}/graphql`,
      fetch,
    }),
    cache,
  });
