// API/src/Modules/Zones/ZonePermissionModel.ts
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../Users/UserModel';
import { Zone } from './ZoneModel';

export enum ZoneAccessPermission {
  READ = 'READ',
  WRITE = 'WRITE',
  ADMIN = 'ADMIN',
}

registerEnumType(ZoneAccessPermission, { name: 'ZoneAccessPermissions' });

@ObjectType()
@Entity()
export class ZonePermissions extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Zone)
  zone: Zone;
  @Column()
  zoneId: string;

  @Field(() => User)
  @ManyToOne(() => User, { lazy: true })
  user: Promise<User> | User;
  @Column()
  userId: string;

  @Field(() => [ZoneAccessPermission])
  @Column({ enum: ZoneAccessPermission, type: 'enum', array: true })
  accessPermissions: ZoneAccessPermission[];
}
