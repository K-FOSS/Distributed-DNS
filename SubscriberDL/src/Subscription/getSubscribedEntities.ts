// SubscriberDL/src/Subscription/getSubscribedEntities.ts
import { config } from '../Config'
import { Acme } from '../graphqlTypes.gen'
import { apolloClient } from '../Library/apollo'
import { ZoneFragment } from '../Zones/Zone.gen'
import {
  GetSubscribedEntities,
  GetSubscribedEntitiesQuery,
  GetSubscribedEntitiesQueryVariables,
} from './GraphQL/GetSubscribedEntities.gen'

type SubscribedEntities = ZoneFragment | Pick<Acme, 'id'>

export async function getSubscribedEntities(): Promise<SubscribedEntities[]> {
  const { data, errors } = await apolloClient.query<
    GetSubscribedEntitiesQuery,
    GetSubscribedEntitiesQueryVariables
  >({
    query: GetSubscribedEntities,
    variables: {
      subscriberToken: config.subscriberToken,
    },
  })

  return data.getSubscribedEntities
}
