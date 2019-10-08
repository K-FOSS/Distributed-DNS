// Web/Server/Configuration/index.tsx
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HasSetup, HasSetupQuery } from './hasSetup.gen';

export interface AppConfiguration {
  baseUrl: string;
}

let cache = false;

export async function hasSetup(
  client: ApolloClient<NormalizedCacheObject>,
): Promise<boolean> {
  const { data } = await client.query<HasSetupQuery>({
    query: HasSetup,
    fetchPolicy: cache ? 'cache-only' : 'network-only',
  });

  if (data.hasSetup && !cache) cache = true;

  return data.hasSetup;
}
