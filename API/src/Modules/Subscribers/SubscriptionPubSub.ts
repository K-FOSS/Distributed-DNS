// API/src/Modules/Subscribers/SubscriptionPubSub.ts
import { EventEmitter } from 'events';
import { Subscriber } from './SubscriberModel';
import pEvent from 'p-event';
import { Zone } from '../Zones/ZoneModel';

interface EventSubscriber {
  Id: string;
  eventEmitter: EventEmitter;
}

const eventSubscribers: EventSubscriber[] = [];

const timeout = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export class SubscriberPubSub {
  public ee: EventEmitter = new EventEmitter();
  public async publish(zoneId: string, payload: Zone) {
    this.ee.emit(zoneId, payload);
  }

  public async addZoneToSubscriber(
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
  }

  public async subscribe(
    subscriberToken: string,
  ): Promise<AsyncIterator<Zone>> {
    const eventEmitter = this.ee;
    let subscription = await Subscriber.getSubscriberFromToken(subscriberToken);
    eventSubscribers.push({ Id: subscription.id, eventEmitter });

    async function* zoneEvents() {
      subscription = await Subscriber.getSubscriberFromToken(subscriberToken);
      const zoneIds: string[] = [];

      for (const { id } of subscription.subscribedZones) zoneIds.push(id);

      yield* pEvent.iterator(eventEmitter, zoneIds, {
        resolutionEvents: [`${subscription.id}-newZone`],
      });
    }

    async function* subscribeToZoneGen() {
      while (true) {
        yield* zoneEvents();
      }
    }

    return subscribeToZoneGen();
  }
  public async unsubscribe(subId: number) {}
}

export const subscriberPubSub = new SubscriberPubSub();
