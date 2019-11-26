// SubscriberDL/src/Subscription/subscribeToChanges.ts
import { apolloClient } from '../Library/apollo'
import {
  Subscribe,
  SubscribeSubscription,
  SubscribeSubscriptionVariables,
} from './GraphQL/Subscribe.gen'
import { config } from '../Config'
import { SubscriberPayloadType } from '../graphqlTypes.gen'
import { createUpdateZoneFile, deleteZone } from '../Zones'

export async function subscribeToChanges(): Promise<void> {
  const subscription = apolloClient.subscribe<
    SubscribeSubscription,
    SubscribeSubscriptionVariables
  >({
    query: Subscribe,
    variables: {
      subscriberToken: config.subscriberToken,
    },
  })

  subscription.subscribe({
    async next({ data }) {
      if (
        data.subscribe.eventType === SubscriberPayloadType.Update ||
        data.subscribe.eventType === SubscriberPayloadType.Create
      ) {
        if ('domainName' in data.subscribe.entity) {
          await createUpdateZoneFile(data.subscribe.entity)
        } else if ('privateKey' in data.subscribe.entity) {
          console.log('Certificate')
          console.log(data.subscribe.entity)
        }
        console.log(data.subscribe)
      } else if (data.subscribe.eventType === SubscriberPayloadType.Delete) {
        if ('domainName' in data.subscribe.entity) {
          await deleteZone(data.subscribe.id)
        } else if ('privateKey' in data.subscribe.entity) {
          console.log('Delete a Cert')
        }
      }
    },
  })
}
