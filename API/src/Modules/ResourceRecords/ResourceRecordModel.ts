// API/src/Modules/ResourceRecords/ResourceRecordModel.ts
import { ObjectType, ID, Field } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  AfterUpdate,
  AfterInsert,
  AfterRemove,
} from 'typeorm';
import { ResourceRecordType } from './ResourceRecordTypes';
import { Zone } from '../Zones/ZoneModel';
import { subscriberPubSub } from '../Subscribers/SubscriptionPubSub';

@ObjectType()
@Entity()
export class ResourceRecord extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field(() => ResourceRecordType)
  @Column({ type: 'enum', enum: ResourceRecordType })
  type: ResourceRecordType;

  @Field()
  @Column('varchar')
  host: string;

  @Field({ description: 'JSON Stringified data' })
  @Column('text')
  data: string;

  @ManyToOne(() => Zone)
  zone: Zone;
  @Column()
  zoneId: string;

  @AfterUpdate()
  @AfterInsert()
  @AfterRemove()
  async updateZone(): Promise<void> {
    subscriberPubSub.publish(
      this.zoneId,
      await Zone.findOneOrFail(this.zoneId),
    );
  }
}
