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
import { Permission } from '../Permission/Permission';

@ObjectType()
@Entity()
export class SubscriberAccess extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(
    () => Subscriber,
    (subscriber) => subscriber.accessPermissions,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  subscriber: Subscriber;

  @Column()
  subscriberId: string;

  @Field(() => User)
  @ManyToOne(() => User, { lazy: true })
  user: Promise<User> | User;

  @Column()
  userId: string;

  @Field(() => [Permission])
  @Column({ enum: Permission, type: 'enum', array: true })
  accessPermissions: Permission[];
}
