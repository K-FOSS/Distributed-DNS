// UI/server/initApollo.ts
// KristianFJones <me@kristianjones.xyz>
// Creates the Apollo Client Connection to backend from UI Server
import {
  InMemoryCache,
  NormalizedCacheObject,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { OperationDefinitionNode } from 'graphql'
import fetch from 'isomorphic-unfetch'
import { createHttpLink } from 'apollo-link-http'
import { config } from './Config'
// @ts-ignore
import introspectionQueryResultData from './fragmentTypes.json'

/**
 * Create Apollo Client
 */
export const initApollo = (): ApolloClient<NormalizedCacheObject> => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  })

  const uri = `${config.apiURL}/graphql`

  const httpLink = createHttpLink({
    uri,
    fetch,
  })

  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri,
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: {
        authToken: config.subscriberToken,
      },
    },
    webSocketImpl: require('ws'),
  })

  const terminatingLink = split(
    ({ query: { definitions } }) =>
      definitions.some((node) => {
        const { kind, operation } = node as OperationDefinitionNode
        return kind === 'OperationDefinition' && operation === 'subscription'
      }),
    wsLink,
    httpLink,
  )

  const link = ApolloLink.from([terminatingLink])

  return new ApolloClient({
    link: link,
    cache: new InMemoryCache({ fragmentMatcher }),
  })
}
