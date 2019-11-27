// SubscriberDL/src/index.ts
import './getSchema'
import { config, errorMessages } from './Config'
import { subscribeToChanges } from './Subscription'
import { pullSubscribedEntities } from './Subscription/pullSubscribedEntities'

/**
 * Start the Subscriber Download Client Application
 */
async function startSubscriberDL(): Promise<void> {
  console.log('Starting Subscriber Download Client')

  if (!config.subscriberToken) {
    console.error(errorMessages.invalidSubscriber)
    throw new Error(errorMessages.invalidSubscriber)
  }

  console.log('Created Apollo Client')

  console.log('Getting SubscriberDL Client Settings from API')

  console.log('Getting latest Entities')

  const entities = await pullSubscribedEntities()

  subscribeToChanges()
}

startSubscriberDL()
