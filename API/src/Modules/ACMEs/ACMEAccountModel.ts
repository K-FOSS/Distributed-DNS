// API/src/Modules/ACMEs/ACMEAccountModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  BeforeInsert,
  Column,
} from 'typeorm';
import { ACME, directoryUrl } from './ACMEModel';
import { Client, forge } from 'acme-client';

@ObjectType()
@Entity()
export class ACMEAccount extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @OneToOne(() => ACME, (acme) => acme.acmeAccount)
  acme: ACME;

  @Column('varchar')
  email: string;

  @Column('varchar')
  accountUrl: string;

  @Column('text')
  accountKey: Buffer;

  @BeforeInsert()
  async generateACMEAccount(): Promise<void> {
    const accountKey = await forge.createPrivateKey(4096);
    const ACME = new Client({ accountKey, directoryUrl });

    await ACME.createAccount({
      termsOfServiceAgreed: true,
      contact: [`mailto:${this.email}`],
    });

    this.accountUrl = ACME.getAccountUrl();
    this.accountKey = accountKey;
  }
}
