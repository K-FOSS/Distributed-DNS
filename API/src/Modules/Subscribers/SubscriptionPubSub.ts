// API/src/Modules/Subscribers/SubscriptionPubSub.ts
import { EventEmitter } from 'events';
import { Subscriber, SubscriberEntities } from './SubscriberModel';
import pEvent from 'p-event';
import { Zone } from '../Zones/ZoneModel';
import {
  SubscriberEventPayloadType,
  SubscriberEventPayload,
} from './SubscriberEventPayload';

interface EventSubscriber {
  Id: string;
  eventEmitter: EventEmitter;
}

const eventSubscribers: EventSubscriber[] = [];

/*
const timeout = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms)); */

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

  /*
  public async addEnityToSubscriber(
    subscriberId: string,
    zoneId: string,
  ): Promise<void> {
    const zone = await Zone.findOneOrFail({
      where: { id: zoneId },
      relations: ['resourceRecords'],
    });

    this.ee.emit(`${subscriberId}-newZone`);

    await timeout(10000);

    this.ee.emit(zone.id, zone);
  } */

  public async subscribe(
    subscriberToken: string,
  ): Promise<AsyncIterator<Zone>> {
    const eventEmitter = this.ee;
    let subscription = await Subscriber.getSubscriberFromToken(subscriberToken);
    eventSubscribers.push({ Id: subscription.id, eventEmitter });

    async function* subscriberEvents() {
      subscription = await Subscriber.getSubscriberFromToken(subscriberToken);
      const entityIds: string[] = [];

      for (const { id } of await subscription.subscribedEntities)
        entityIds.push(id);

      yield* pEvent.iterator(eventEmitter, entityIds, {
        resolutionEvents: [`${subscription.id}-newEntity`],
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
