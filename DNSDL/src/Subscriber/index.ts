// DNSDL/src/Subscriber/index.ts
import { ApolloClient, ApolloQueryResult } from 'apollo-client';
import {
  SubscribeToZones,
  SubscribeToZonesSubscription,
  SubscribeToZonesSubscriptionVariables
} from './SubscribeToZones.gen';
import {
  GetSubscribedZones,
  GetSubscribedZonesQuery,
  GetSubscribedZonesQueryVariables
} from './GetSubscribedZones.gen';
import { Observable, FetchResult } from 'apollo-link';

interface SubscribeInput {
  client: ApolloClient<any>;
  subscriberToken: string;
}

export async function subscribeToZone({
  client,
  subscriberToken
}: SubscribeInput): Promise<
  Observable<FetchResult<SubscribeToZonesSubscription>>
> {
  return client.subscribe<
    SubscribeToZonesSubscription,
    SubscribeToZonesSubscriptionVariables
  >({ query: SubscribeToZones, variables: { subscriberToken } });
}

export async function getSubscribedZones({
  client,
  subscriberToken
}: SubscribeInput): Promise<ApolloQueryResult<GetSubscribedZonesQuery>> {
  return client.query<
    GetSubscribedZonesQuery,
    GetSubscribedZonesQueryVariables
  >({ query: GetSubscribedZones, variables: { subscriberToken } });
}
