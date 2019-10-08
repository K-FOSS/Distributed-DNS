// API/src/Modules/Subscribers/SubscriberModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import { sign, verify } from 'jsonwebtoken';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Zone } from '../Zones/ZoneModel';
import { config } from 'API/Config';
import { ApolloError } from 'apollo-server-koa';

interface SubscriberTokenPayload {
  subscriberId: string;
}

@ObjectType()
@Entity()
export class Subscriber extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => Zone)
  @ManyToMany(() => Zone, { eager: true })
  @JoinTable()
  subscribedZones: Zone[];

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
}
