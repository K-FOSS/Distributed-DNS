// API/src/Modules/Subscribers/SubscriberModel.ts
import {
  createUnionType,
  Field,
  ID,
  ObjectType,
  ForbiddenError,
} from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ACME } from '../ACMEs/ACMEModel';
import { Zone } from '../Zones/ZoneModel';
import { SubscriberAccess } from './SubscriberAccessModel';
import { config } from 'API/Config';
import { ApolloError } from 'apollo-server-koa';
import { User } from '../Users/UserModel';
import { verify, sign } from 'jsonwebtoken';
import { SubscriberType } from './SubscriberType';

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

  @Field(() => SubscriberType)
  @Column({ enum: SubscriberType })
  readonly type: SubscriberType;

  @Field()
  @Column('varchar', { default: 'Subs' })
  name: string;

  @Field(() => [SubscriberAccess])
  @OneToMany(
    () => SubscriberAccess,
    (subscriberAccess) => subscriberAccess.subscriber,
    {
      cascade: ['insert', 'update'],
    },
  )
  accessPermissions: SubscriberAccess[];

  @Field(() => [SubscriberEntities])
  @ManyToMany(() => Zone || ACME, { cascade: ['insert', 'update'], lazy: true })
  @JoinTable()
  subscribedEntities: typeof SubscriberEntities[];

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
}
