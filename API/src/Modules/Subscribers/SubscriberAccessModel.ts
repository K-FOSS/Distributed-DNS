// API/src/Modules/Subscribers/SubscriberPermissions.ts
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../Users/UserModel';
import { Subscriber } from './SubscriberModel';

@ObjectType()
@Entity()
export class SubscriberAccess extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Subscriber, (subscriber) => subscriber.accessPermissions)
  @JoinColumn()
  subscriber: Subscriber;
  @Column()
  subscriberId: string;

  @ManyToOne(() => User)
  user: Promise<User> | User;
  @Column()
  userId: string;
}
