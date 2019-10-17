// API/src/Modules/Subscribers/SubscriberModel.ts
import { Field, ID, ObjectType, ForbiddenError } from 'type-graphql';
import { sign, verify } from 'jsonwebtoken';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Column,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { Zone } from '../Zones/ZoneModel';
import { config } from 'API/Config';
import { ApolloError } from 'apollo-server-koa';
import { SubscriberAccess } from './SubscriberAccessModel';
import { User } from '../Users/UserModel';

interface SubscriberTokenPayload {
  subscriberId: string;
}

@ObjectType()
@Entity()
export class Subscriber extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column('varchar', { default: 'Subs' })
  name: string;

  @Field(() => Zone)
  @ManyToMany(() => Zone, { cascade: ['insert', 'update'], lazy: true })
  @JoinTable()
  subscribedZones: Zone[];

  @Field(() => [SubscriberAccess])
  @OneToMany(
    () => SubscriberAccess,
    (subscriberAccess) => subscriberAccess.subscriber,
    {
      cascade: ['insert', 'update'],
    },
  )
  accessPermissions: SubscriberAccess[];

  @Field(() => String)
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

  static async getSubscribers(user: User | string): Promise<Subscriber[]> {
    return this.createQueryBuilder('subscriber')
      .leftJoinAndSelect('subscriber.accessPermissions', 'access')
      .where('access.userId = :userId', {
        userId: typeof user === 'string' ? user : user.id,
      })
      .getMany();
  }

  static async getSubscriber(
    subscriberId: string,
    user: User | string,
  ): Promise<Subscriber> {
    const subscriber = await this.createQueryBuilder('subscriber')
      .where('subscriber.id = :subscriberId', { subscriberId })
      .leftJoinAndSelect('subscriber.accessPermissions', 'access')
      .andWhere('access.userId = :userId', {
        userId: typeof user === 'string' ? user : user.id,
      })
      .getOne();

    if (!subscriber) throw new ForbiddenError();

    return subscriber;
  }

  @BeforeUpdate()
  async beforeUpdate(item: Subscriber, b: string): Promise<void> {
    console.log(item, b);
  }
}
