// API/src/Modules/Subscribers/SubscribersResolver.ts
import { AuthContext } from 'API/Context';
import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql';
import { CurrentUser } from '../Auth/CurrentUser';
import { Zone } from '../Zones/ZoneModel';
import { SubscriberAccess } from './SubscriberAccessModel';
import { SubscriberEventPayload } from './SubscriberEventPayload';
import { SubscriberInput } from './SubscriberInput';
import { Subscriber, SubscriberEntities } from './SubscriberModel';
import { subscriberPubSub } from './SubscriptionPubSub';

@Resolver(() => Subscriber)
export class SubscribersResolver {
  @Authorized()
  @Query(() => Subscriber)
  async subscriber(
    @Arg('subscriberId', () => ID) subscriberId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Subscriber> {
    return Subscriber.getSubscriber(subscriberId, currentUser);
  }

  @Query(() => [Zone])
  async getSubscribedEntities(
    @Arg('subscriberToken') subscriberToken: string,
  ): Promise<typeof SubscriberEntities[]> {
    const subscriber = await Subscriber.getSubscriberFromToken(subscriberToken);
    return subscriber.subscribedEntities;
  }

  @Authorized()
  @Mutation(() => CurrentUser)
  async createSubscriber(
    @Arg('input') input: SubscriberInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<CurrentUser> {
    const subscriber = Subscriber.create(input);
    const subscriberAccess = SubscriberAccess.create({
      userId: currentUser.id,
    });

    subscriber.accessPermissions = [subscriberAccess];
    await subscriber.save();

    return currentUser;
  }

  @Mutation(() => Subscriber)
  async testing(
    @Arg('subscriberId', () => ID) subscriberId: string,
    @Arg('zoneId', () => ID) zoneId: string,
  ): Promise<Subscriber> {
    const subscriber = await Subscriber.findOneOrFail({
      where: { id: subscriberId },
      relations: ['subscribedEntities'],
    });
    const zone = await Zone.findOneOrFail({ where: { id: zoneId } });

    (await subscriber.subscribedEntities).push(zone);

    return subscriber.save();
  }

  /*
  @Authorized()
  @Mutation(() => Subscriber)
  async updateSubscriber(
    @Arg('subscriberId', () => ID) subscriberId: string,
    @Arg('input') input: UpdateSubscriberInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Subscriber> {
    const subscriber = await Subscriber.getSubscriber(
      subscriberId,
      currentUser,
    );
    const zonePromises: Promise<Zone>[] = [];

    for (const zoneId of input.addZoneIds)
      zonePromises.push(
        Zone.getUserZone(currentUser, zoneId, Permission.ADMIN),
      );

    const existingZones = (await subscriber.subscribedZones).filter(
      ({ id }) => !input.removeZoneIds.includes(id),
    );

    const zones = await Promise.all(zonePromises);

    subscriber.subscribedZones = [...existingZones, ...zones];

    if (input.name) subscriber.name = input.name;

    await subscriber.save();

    await Promise.all(
      input.addZoneIds.map((zoneId) =>
        subscriberPubSub.addZoneToSubscriber(subscriber.id, zoneId),
      ),
    );

    return subscriber;
  } */

  @Authorized()
  @Mutation(() => String)
  async createSubscriberToken(
    @Arg('subscriberId', () => ID) subscriberId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<string> {
    const subscriber = await Subscriber.getSubscriber(
      subscriberId,
      currentUser,
    );

    return subscriber.subscriberToken();
  }

  @Subscription({
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    subscribe: async (stuff, args) =>
      subscriberPubSub.subscribe(args.subscriberToken),
  })
  subscribe(
    @Arg('subscriberToken') subscriberToken: string,
    @Root() root: SubscriberEventPayload,
  ): SubscriberEventPayload {
    return root;
  }
}
