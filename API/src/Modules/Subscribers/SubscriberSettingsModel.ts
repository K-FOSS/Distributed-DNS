// API/src/Modules/Subscribers/SubscriberSettingsModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  JoinColumn,
  AfterUpdate,
} from 'typeorm';
import { Subscriber } from './SubscriberModel';
import { SubscriberTLSOutputMode } from './SubscriberTLSOutputMode';
import { subscriberPubSub } from './SubscriptionPubSub';
import { SubscriberEventPayloadType } from './SubscriberEventPayload';

@ObjectType()
@Entity()
export class SubscriberSettings extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @OneToOne(() => Subscriber, { onDelete: 'CASCADE' })
  @JoinColumn()
  readonly subscriber: Subscriber;

  @Column()
  subscriberId: string;

  @Field(() => SubscriberTLSOutputMode)
  @Column({
    type: 'enum',
    enum: SubscriberTLSOutputMode,
    default: SubscriberTLSOutputMode.SINGLE,
  })
  TLSOutputMode: SubscriberTLSOutputMode;

  @AfterUpdate()
  async pushSubscriberSettings(): Promise<void> {
    await subscriberPubSub.publish(SubscriberEventPayloadType.UPDATE, this);
  }
}
