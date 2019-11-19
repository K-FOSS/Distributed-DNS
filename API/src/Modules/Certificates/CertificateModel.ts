// API/src/Modules/Certificates/CertificateModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import {
  AfterInsert,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ACME } from '../ACMEs/ACMEModel';
import { SubscriberEventPayloadType } from '../Subscribers/SubscriberEventPayload';
import { subscriberPubSub } from '../Subscribers/SubscriptionPubSub';

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

  @ManyToOne(
    () => ACME,
    (acme) => acme.certificates,
  )
  acme: ACME;

  @Column()
  acmeId: string;

  @AfterInsert()
  async emitEvent(): Promise<void> {
    console.log(`New Certificate`);
    const acme = await ACME.findOneOrFail({ where: { id: this.acmeId } });

    subscriberPubSub.publish(SubscriberEventPayloadType.UPDATE, acme);
  }
}
