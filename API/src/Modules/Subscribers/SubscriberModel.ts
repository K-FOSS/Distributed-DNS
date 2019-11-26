// API/src/Modules/Subscribers/SubscriberModel.ts
import { config } from 'API/Config';
import { ApolloError } from 'apollo-server-koa';
import { sign, verify } from 'jsonwebtoken';
import {
  createUnionType,
  Field,
  ID,
  ObjectType,
  UnauthorizedError,
} from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  AfterInsert,
  FindOneOptions,
} from 'typeorm';
import { ACME } from '../ACMEs/ACMEModel';
import { User } from '../Users/UserModel';
import { Zone } from '../Zones/ZoneModel';
import { SubscriberAccess } from './SubscriberAccessModel';
import { SubscriberSettings } from './SubscriberSettingsModel';
import { Permission } from '../Permission/Permission';
import { UserRole } from '../Users/UserRole';

interface SubscriberTokenPayload {
  subscriberId: string;
}

export const SubscriberEntities = createUnionType({
  name: 'SubscriberEntity',
  types: () => [ACME, Zone],
});

@ObjectType()
@Entity()
export class Subscriber extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field()
  @Column('varchar', { default: 'Subs' })
  name: string;

  @Field(() => [SubscriberAccess])
  @OneToMany(
    () => SubscriberAccess,
    (subscriberAccess) => subscriberAccess.subscriber,
  )
  accessPermissions: SubscriberAccess[];

  @ManyToMany(() => Zone, { cascade: ['insert'], lazy: true })
  @JoinTable()
  subscribedZoneEntities: typeof SubscriberEntities[];

  @ManyToMany(() => ACME, { cascade: ['insert'], lazy: true })
  @JoinTable()
  subscribedTLSEntities: typeof SubscriberEntities[];

  @Field(() => SubscriberSettings)
  async subscriberSettings(): Promise<SubscriberSettings> {
    return SubscriberSettings.findOneOrFail({
      where: {
        subscriberId: this.id,
      },
    });
  }

  subscriberToken(): string {
    const payload: SubscriberTokenPayload = { subscriberId: this.id };
    return sign(payload, config.secretKey);
  }

  static async getSubscriberFromToken(
    subscriberToken: string,
  ): Promise<Subscriber> {
    const payload = verify(
      subscriberToken,
      config.secretKey,
    ) as SubscriberTokenPayload;
    if (!payload.subscriberId)
      throw new ApolloError(
        'Invalid Subscriber token',
        'INVALID_SUBSCRIBER_TOKEN',
      );

    const subscriber = await this.findOne(payload.subscriberId);
    if (!subscriber)
      throw new ApolloError('INVALID Subscription', 'INVALID_SUBSCRIPTION');

    return subscriber;
  }

  async checkUserAuthorization(
    user: User,
    requiredPermission: Permission,
  ): Promise<Subscriber> {
    const authorization = await SubscriberAccess.findOne({
      subscriberId: this.id,
      userId: user.id,
    });

    if (
      (authorization &&
        authorization.accessPermissions.includes(requiredPermission)) ||
      user.roles.includes(UserRole.ADMIN)
    )
      return this;

    throw new UnauthorizedError();
  }

  static async getSubscribers(
    user: User | string,
    requiredPermission = Permission.READ,
  ): Promise<Subscriber[]> {
    return this.createQueryBuilder('subscriber')
      .leftJoinAndSelect('subscriber.accessPermissions', 'access')
      .where('access.userId = :userId', {
        userId: typeof user === 'string' ? user : user.id,
      })
      .andWhere(`access.accessPermissions @> '{"${requiredPermission}"}'`)
      .getMany();
  }

  static async getSubscriber(
    user: User,
    subscriberId: string,
    requiredPermission = Permission.READ,
    options?: FindOneOptions<Subscriber>,
  ): Promise<Subscriber> {
    const subscriber = await Subscriber.findOneOrFail({
      where: { id: subscriberId },
      ...options,
    });

    if (user.roles.includes(UserRole.ADMIN)) return subscriber;
    return subscriber.checkUserAuthorization(user, requiredPermission);
  }

  @AfterInsert()
  async createSubscriberSettings(): Promise<void> {
    const subscriberSettings = SubscriberSettings.create({
      subscriberId: this.id,
    });

    await subscriberSettings.save();
  }
}
