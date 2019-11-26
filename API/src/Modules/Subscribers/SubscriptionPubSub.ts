// API/src/Modules/Subscribers/SubscriptionPubSub.ts
import { EventEmitter } from 'events';
import { Subscriber, SubscriberEntities } from './SubscriberModel';
import pEvent from 'p-event';
import { Zone } from '../Zones/ZoneModel';
import {
  SubscriberEventPayloadType,
  SubscriberEventPayload,
} from './SubscriberEventPayload';
import { EntityType } from './EntityType';
import { ACME } from '../ACMEs/ACMEModel';
import { EntityInput } from './EntityInput';

interface EventSubscriber {
  Id: string;
  eventEmitter: EventEmitter;
}
const eventSubscribers: EventSubscriber[] = [];

const timeout = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export class SubscriberPubSub {
  public ee: EventEmitter = new EventEmitter();

  public async publish(
    eventType: SubscriberEventPayloadType,
    entity: typeof SubscriberEntities,
  ) {
    const eventPayload = new SubscriberEventPayload();
    eventPayload.id = entity.id;
    eventPayload.entity = entity;
    eventPayload.eventType = eventType;

    this.ee.emit(eventPayload.id, eventPayload);
  }

  public async updateSubscriber(
    subscriberId: string,
    newEntities: EntityInput[],
  ): Promise<void> {
    const subscriber = await Subscriber.findOne({
      where: {
        id: subscriberId,
      },
    });
    if (!subscriber) throw new Error('INVALID SUBSCRIBER');

    this.ee.emit(subscriber.id);

    await timeout(5000);

    // const newEntities: Promise<typeof SubscriberEntities[]> = []

    for (const { entityId, entityType } of newEntities) {
      let newEntity: typeof SubscriberEntities;

      if (entityType === EntityType.TLS)
        newEntity = await ACME.findOneOrFail({
          where: {
            id: entityId,
          },
        });
      else if (entityType === EntityType.ZONE)
        newEntity = await Zone.findOneOrFail({
          where: {
            id: entityId,
          },
        });
      else throw new Error('INVALID SUBSCRIBER TYPE');

      this.publish(SubscriberEventPayloadType.CREATE, newEntity);
    }
  }

  public async subscribe(
    subscriberToken: string,
  ): Promise<AsyncIterator<Zone>> {
    const eventEmitter = this.ee;
    let subscription = await Subscriber.getSubscriberFromToken(subscriberToken);
    eventSubscribers.push({ Id: subscription.id, eventEmitter });

    async function* subscriberEvents() {
      subscription = await Subscriber.getSubscriberFromToken(subscriberToken);
      const entityIds: string[] = [];

      for (const { id } of (
        await Promise.all([
          subscription.subscribedZoneEntities,
          subscription.subscribedTLSEntities,
        ])
      ).flat())
        entityIds.push(id);

      yield* pEvent.iterator(eventEmitter, entityIds, {
        resolutionEvents: [subscription.id],
      });
    }

    async function* subscribeToEventsGen() {
      while (true) {
        yield* subscriberEvents();
      }
    }

    return subscribeToEventsGen();
  }

  public async unsubscribe(subId: number) {
    console.log(`Unsubsriber ${subId}`);
  }
}

export const subscriberPubSub = new SubscriberPubSub();
