// API/src/Modules/ACMEs/ACMEAccessModel.ts
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../Users/UserModel';
import { ACME } from './ACMEModel';
import { Permission } from '../Permission/Permission';

@Entity()
export class ACMEAccess extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @ManyToOne(
    () => ACME,
    (acme) => acme.permissions,
  )
  acme: ACME;

  @Column()
  acmeId: string;

  @ManyToOne(() => User)
  user: Promise<User> | User;

  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: Permission,
    array: true,
    default: [Permission.READ],
  })
  permission: Permission[];
}
