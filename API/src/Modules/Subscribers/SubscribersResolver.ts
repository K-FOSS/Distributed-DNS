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
  FieldResolver,
} from 'type-graphql';
import { CurrentUser } from '../Auth/CurrentUser';
import { SubscriberAccess } from './SubscriberAccessModel';
import {
  SubscriberEventPayload,
  SubscriberEventPayloadType,
} from './SubscriberEventPayload';
import { SubscriberInput } from './SubscriberInput';
import { Subscriber, SubscriberEntities } from './SubscriberModel';
import { subscriberPubSub } from './SubscriptionPubSub';
import { Permission, getPermission } from '../Permission/Permission';
import { ApolloError } from 'apollo-server-koa';
import { UserPermissionInput } from '../Permission/UserInput';
import { EntityInput } from './EntityInput';
import { EntityType } from './EntityType';
import { Zone } from '../Zones/ZoneModel';
import { ACME } from '../ACMEs/ACMEModel';

@Resolver(() => Subscriber)
export class SubscribersResolver {
  @Authorized()
  @Query(() => Subscriber)
  async subscriber(
    @Arg('subscriberId', () => ID) subscriberId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Subscriber> {
    return Subscriber.getSubscriber(
      currentUser,
      subscriberId,
      Permission.READ,
      {
        relations: ['accessPermissions'],
      },
    );
  }

  @Query(() => [SubscriberEntities])
  async getSubscribedEntities(
    @Arg('subscriberToken') subscriberToken: string,
  ): Promise<typeof SubscriberEntities[]> {
    const subscriber = await Subscriber.getSubscriberFromToken(subscriberToken);
    return (
      await Promise.all([
        subscriber.subscribedZoneEntities,
        subscriber.subscribedTLSEntities,
      ])
    ).flat();
  }

  @Authorized()
  @Mutation(() => CurrentUser)
  async createSubscriber(
    @Arg('input') input: SubscriberInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<CurrentUser> {
    const subscriber = Subscriber.create(input);
    await subscriber.save();

    const subscriberAccess = SubscriberAccess.create({
      userId: currentUser.id,
      accessPermissions: [Permission.READ, Permission.WRITE, Permission.ADMIN],
      subscriberId: subscriber.id,
    });
    await subscriberAccess.save();

    return currentUser;
  }

  @Authorized()
  @Mutation(() => Subscriber)
  async addSubscriberUser(
    @Arg('subscriberId', () => ID) subscriberId: string,
    @Arg('input') { userId, accessPermission }: UserPermissionInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Subscriber> {
    const subscriber = await Subscriber.getSubscriber(
      currentUser,
      subscriberId,
      Permission.ADMIN,
    );

    const subscriberPermissions = await SubscriberAccess.find({
      where: {
        subscriberId: subscriber.id,
      },
    });

    const existingPermissions = subscriberPermissions.find(
      ({ userId: oldUserId }) => oldUserId === userId,
    );
    if (existingPermissions) throw new ApolloError('USER ALREADY IN ZONE');

    let newUserAccessPermission: Permission[];

    if (accessPermission === Permission.ADMIN)
      newUserAccessPermission = [
        Permission.READ,
        Permission.WRITE,
        Permission.ADMIN,
      ];
    else if (accessPermission === Permission.WRITE)
      newUserAccessPermission = [Permission.READ, Permission.WRITE];
    else if (accessPermission === Permission.READ)
      newUserAccessPermission = [Permission.READ];

    const userAccess = SubscriberAccess.create({
      userId: userId,
      accessPermissions: newUserAccessPermission!,
      subscriberId: subscriber.id,
    });

    await userAccess.save();

    return subscriber;
  }

  @Authorized()
  @Mutation(() => Subscriber)
  async removeSubscriberUser(
    @Arg('subscriberId', () => ID) subscriberId: string,
    @Arg('userId', () => ID) userId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Subscriber> {
    if (currentUser.id === userId)
      throw new ApolloError(`You can't remove yourself silly`, 'SILLY_HUMAN');

    const subscriber = await Subscriber.getSubscriber(
      currentUser,
      subscriberId,
      Permission.ADMIN,
    );

    const subscriberPermissions = await SubscriberAccess.findOne({
      where: {
        subscriberId: subscriber.id,
        userId,
      },
    });
    if (!subscriberPermissions)
      throw new ApolloError('USER IS NOT IN SUBSCRIBER');

    await subscriberPermissions.remove();

    return subscriber;
  }

  /*
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
  @Mutation(() => Subscriber)
  async addEntityToSubscriber(
    @Arg('subscriberId', () => ID) subscriberId: string,
    @Arg('newEntities', () => [EntityInput]) newEntities: EntityInput[],
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Subscriber> {
    const subscriber = await Subscriber.getSubscriber(
      currentUser,
      subscriberId,
      Permission.WRITE,
    );

    const zoneEntities = await subscriber.subscribedZoneEntities;
    const tlsEntities = await subscriber.subscribedTLSEntities;

    for (const { entityType, entityId } of newEntities) {
      let entity: typeof SubscriberEntities;

      if (entityType === EntityType.ZONE) {
        entity = await Zone.getUserZone(currentUser, entityId, Permission.READ);
        zoneEntities.push(entity);
      } else if (entityType === EntityType.TLS) {
        entity = await ACME.getUserACME(
          entityId,
          currentUser,
          {},
          Permission.READ,
        );

        tlsEntities.push(entity);
      } else throw new Error('INVALID ENTITY');

      if (!entity) throw new Error('INVALID ENTITY');
    }

    await subscriber.save();

    await subscriberPubSub.updateSubscriber(subscriber.id, newEntities);

    return subscriber;
  }

  @Authorized()
  @Mutation(() => Subscriber)
  async removeEntityFromSubscriber(
    @Arg('subscriberId', () => ID) subscriberId: string,
    @Arg('entityIds', () => [ID]) entityIds: string[],
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Subscriber> {
    const subscriber = await Subscriber.getSubscriber(
      currentUser,
      subscriberId,
      Permission.WRITE,
    );

    const zoneEntities = await subscriber.subscribedZoneEntities;
    const tlsEntities = await subscriber.subscribedTLSEntities;

    for (const entityId of entityIds) {
      const zoneIndex = zoneEntities.findIndex(({ id }) => id === entityId);
      const tlsIndex = tlsEntities.findIndex(({ id }) => id === entityId);
      console.log(zoneIndex);
      if (zoneEntities[zoneIndex]) {
        subscriberPubSub.publish(
          SubscriberEventPayloadType.DELETE,
          zoneEntities[zoneIndex],
        );
        zoneEntities.splice(zoneIndex, 1);

        subscriberPubSub.ee.emit(subscriber.id);
      } else if (tlsEntities[tlsIndex]) {
        subscriberPubSub.publish(
          SubscriberEventPayloadType.DELETE,
          tlsEntities[tlsIndex],
        );
        tlsEntities.splice(tlsIndex, 1);

        subscriberPubSub.ee.emit(subscriber.id);
      }
    }

    console.log(zoneEntities);
    console.log(subscriber.subscribedZoneEntities);

    await subscriber.save();

    return subscriber;
  }

  @Authorized()
  @Mutation(() => String)
  async createSubscriberToken(
    @Arg('subscriberId', () => ID) subscriberId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<string> {
    const subscriber = await Subscriber.getSubscriber(
      currentUser,
      subscriberId,
      Permission.ADMIN,
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

  @Authorized()
  @FieldResolver(() => Permission)
  async userAccess(
    @Root() { id }: Subscriber,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Permission> {
    const userAccess = await SubscriberAccess.findOneOrFail({
      where: { subscriberId: id, userId: currentUser.id },
    });

    try {
      return getPermission(userAccess.accessPermissions);
    } catch {
      throw new ApolloError('PERMISSIONS ERROR');
    }
  }

  @Authorized()
  @FieldResolver(() => [Permission])
  async userPermissions(
    @Root() { id }: Subscriber,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Permission[]> {
    const userPermission = await SubscriberAccess.findOneOrFail({
      where: { subscriberId: id, userId: currentUser.id },
    });

    return userPermission.accessPermissions;
  }

  @Authorized()
  @FieldResolver()
  async accessPermissions(
    @Root() subscriber: Subscriber,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<SubscriberAccess[]> {
    await subscriber.checkUserAuthorization(currentUser, Permission.ADMIN);

    return SubscriberAccess.find({
      where: {
        subscriberId: subscriber.id,
      },
    });
  }

  @FieldResolver(() => [SubscriberEntities])
  async subscribedEntities(
    @Root() { subscribedZoneEntities, subscribedTLSEntities }: Subscriber,
  ): Promise<typeof SubscriberEntities[]> {
    return (
      await Promise.all([subscribedZoneEntities, subscribedTLSEntities])
    ).flat();
  }
}
