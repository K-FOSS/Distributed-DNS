// API/src/Modules/ResourceRecords/ResourceRecordModel.ts
import { Max } from 'class-validator';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  AfterRemove,
  AfterUpdate,
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  AfterInsert,
} from 'typeorm';
import { SubscriberEventPayloadType } from '../Subscribers/SubscriberEventPayload';
import { subscriberPubSub } from '../Subscribers/SubscriptionPubSub';
import { Zone } from '../Zones/ZoneModel';
import { ResourceRecordType } from './ResourceRecordTypes';

@ObjectType()
@Entity()
export class ResourceRecord extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Column('int', { nullable: true })
  @Field(() => Int, { nullable: true, defaultValue: 300 })
  @Max(86400)
  ttl?: number | null;

  @Field(() => ResourceRecordType)
  @Column({ type: 'enum', enum: ResourceRecordType })
  type: ResourceRecordType;

  @Field()
  @Column('varchar')
  host: string;

  @Field({ description: 'JSON Stringified data' })
  @Column('text')
  data: string;

  @ManyToOne(
    () => Zone,
    (zone) => zone.resourceRecords,
    {
      cascade: ['remove'],
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  zone: Zone;

  @Column()
  zoneId: string;

  @AfterUpdate()
  @AfterRemove()
  @AfterInsert()
  async updateZone(): Promise<void> {
    const zone = await Zone.findOne(this.zoneId);
    if (zone) subscriberPubSub.publish(SubscriberEventPayloadType.UPDATE, zone);
  }
}
