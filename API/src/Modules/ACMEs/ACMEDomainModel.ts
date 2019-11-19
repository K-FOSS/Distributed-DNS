// API/src/Modules/ACMEs/ACMEDomainModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Zone } from '../Zones/ZoneModel';
import { ACME } from './ACMEModel';

@ObjectType()
@Entity()
export class ACMEDomain extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @ManyToOne(
    () => ACME,
    (acme) => acme.domains,
  )
  acme: ACME;

  @Column()
  acmeId: string;

  @Field(() => Zone)
  @ManyToOne(() => Zone, { cascade: ['insert'] })
  @JoinColumn()
  zone: Zone;

  @Column()
  zoneId: string;

  @Field(() => [String])
  @Column({ type: 'varchar', array: true })
  domains: string[];
}
