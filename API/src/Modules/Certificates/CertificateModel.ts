// API/src/Modules/Certificates/CertificateModel.ts
import { ObjectType, Field, ID } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  AfterInsert,
} from 'typeorm';
import { ACME } from '../ACMEs/ACMEModel';
import { acmePubSub } from '../ACMEs/ACMEPubSub';

@ObjectType()
@Entity()
export class Certificate extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field()
  @Column('text')
  readonly certificate: string;

  @Field()
  @Column('text')
  readonly privateKey: string;

  @ManyToOne(() => ACME, (acme) => acme.certificates)
  acme: ACME;
  @Column()
  acmeId: string;

  @AfterInsert()
  async emitEvent(): Promise<void> {
    console.log(`New Certificate`);
    acmePubSub.publish(this.acmeId, this);
  }
}
