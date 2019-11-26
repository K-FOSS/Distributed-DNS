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
} from 'typeorm';
import { Subscriber } from './SubscriberModel';

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

  @OneToOne(() => Subscriber, { cascade: ['remove'], onDelete: 'CASCADE' })
  readonly subscriber: Subscriber;

  @Column()
  subscriberId: string;
}
