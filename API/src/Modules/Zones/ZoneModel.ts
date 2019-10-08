// API/src/Modules/Zones/ZoneModel.ts
import { ObjectType, ID, Field, UnauthorizedError } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  FindOneOptions,
  ManyToMany,
  AfterUpdate,
} from 'typeorm';
import { ResourceRecord } from '../ResourceRecords/ResourceRecordModel';
import { ZonePermissions, ZoneAccessPermission } from './ZonePermissionModel';
import { User } from '../Users/UserModel';
import { Subscriber } from '../Subscribers/SubscriberModel';
import { subscriberPubSub } from '../Subscribers/SubscriptionPubSub';

@ObjectType()
@Entity()
export class Zone extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @Column('varchar')
  contact: string;

  @Field(() => Date, { nullable: true })
  async updatedDate(): Promise<Date | undefined> {
    const resourceRecord = await ResourceRecord.getRepository().findOne(
      undefined,
      { order: { updatedAt: 'DESC' } },
    );

    return resourceRecord ? resourceRecord.updatedAt : undefined;
  }

  @Field()
  @Column('varchar')
  domainName: string;

  @Field(() => [ResourceRecord])
  @OneToMany(() => ResourceRecord, (resourceRecord) => resourceRecord.zone)
  @JoinColumn()
  resourceRecords: ResourceRecord[];

  @Field(() => [ZonePermissions])
  @OneToMany(() => ZonePermissions, (zonePermission) => zonePermission.zone)
  accessPermissions: ZonePermissions[];

  @Field(() => Subscriber)
  @ManyToMany(() => Subscriber)
  subscribers: Subscriber[];

  async checkUserAuthorization(
    user: User,
    requiredPermission: ZoneAccessPermission,
  ): Promise<Zone> {
    const authorization = await ZonePermissions.findOne({
      zoneId: this.id,
      userId: user.id,
    });

    if (
      !authorization ||
      !authorization.accessPermissions.includes(requiredPermission)
    )
      throw new UnauthorizedError();
    else return this;
  }

  static async getUserZones(
    user: User,
    requiredPermission: ZoneAccessPermission,
  ): Promise<Zone[]> {
    return this.createQueryBuilder('zone')
      .leftJoinAndSelect('zone.accessPermissions', 'zone_permissions')
      .where('zone_permissions.userId = :userId', { userId: user.id })
      .andWhere(
        `zone_permissions.accessPermissions @> '{"${requiredPermission}"}'`,
      )
      .getMany();
  }

  static async getUserZone(
    user: User,
    zoneId: string,
    requiredPermission: ZoneAccessPermission,
    options?: FindOneOptions<Zone>,
  ): Promise<Zone> {
    const zone = await Zone.findOneOrFail(zoneId, options);
    return zone.checkUserAuthorization(user, requiredPermission);
  }

  @AfterUpdate()
  updateZone(): void {
    subscriberPubSub.publish(this.id, this);
  }
}
