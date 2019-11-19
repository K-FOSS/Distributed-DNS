// API/src/Modules/Zones/ZonePermissionModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../Users/UserModel';
import { Zone } from './ZoneModel';
import { Permission } from '../Permission/Permission';

@ObjectType()
@Entity()
export class ZonePermissions extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(
    () => Zone,
    (zone) => zone.accessPermissions,
    {
      cascade: ['remove'],
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  zone: Zone;

  @Column()
  zoneId: string;

  @Field(() => User)
  @ManyToOne(() => User, { lazy: true })
  user: Promise<User> | User;

  @Column()
  userId: string;

  @Field(() => [Permission])
  @Column({ enum: Permission, type: 'enum', array: true })
  accessPermissions: Permission[];
}
