// API/src/Modules/Zones/ZoneModel.ts
import { Field, ID, ObjectType, UnauthorizedError } from 'type-graphql';
import {
  AfterUpdate,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  FindOneOptions,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  AfterRemove,
  BeforeRemove,
} from 'typeorm';
import { Permission } from '../Permission/Permission';
import { ResourceRecord } from '../ResourceRecords/ResourceRecordModel';
import { Subscriber } from '../Subscribers/SubscriberModel';
import { subscriberPubSub } from '../Subscribers/SubscriptionPubSub';
import { User } from '../Users/UserModel';
import { UserRole } from '../Users/UserRole';
import { ZonePermissions } from './ZonePermissionModel';
import { ZoneSettings } from './ZoneSettingsModel';
import { SubscriberEventPayloadType } from '../Subscribers/SubscriberEventPayload';

@ObjectType()
@Entity()
export class Zone extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @OneToOne(() => ZoneSettings, {
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  zoneSettings: ZoneSettings;

  @Column()
  zoneSettingsId: string;

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
  @OneToMany(
    () => ResourceRecord,
    (resourceRecord) => resourceRecord.zone,
    {
      cascade: ['insert', 'update'],
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  resourceRecords: ResourceRecord[];

  @Field(() => [ZonePermissions])
  @OneToMany(
    () => ZonePermissions,
    (zonePermission) => zonePermission.zone,
    {
      cascade: ['insert', 'update'],
      onDelete: 'CASCADE',
    },
  )
  accessPermissions: ZonePermissions[];

  @Field(() => Subscriber)
  @ManyToMany(() => Subscriber)
  subscribers: Subscriber[];

  async checkUserAuthorization(
    user: User,
    requiredPermission: Permission,
  ): Promise<Zone> {
    const authorization = await ZonePermissions.findOne({
      zoneId: this.id,
      userId: user.id,
    });

    if (
      (authorization &&
        authorization.accessPermissions.includes(requiredPermission)) ||
      user.roles.includes(UserRole.ADMIN)
    )
      return this;

    throw new UnauthorizedError();
  }

  static async getUserZones(
    user: User,
    requiredPermission: Permission,
  ): Promise<Zone[]> {
    if (user.roles.includes(UserRole.ADMIN)) return this.find();
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
    requiredPermission: Permission,
    options?: FindOneOptions<Zone>,
  ): Promise<Zone> {
    const zone = await Zone.findOneOrFail(zoneId, options);

    console.log(zone);

    if (user.roles.includes(UserRole.ADMIN)) return zone;
    return zone.checkUserAuthorization(user, requiredPermission);
  }

  @BeforeRemove()
  async beforeRemove(): Promise<void> {
    console.log('Removing');
  }

  @AfterUpdate()
  updateZone(): void {
    subscriberPubSub.publish(SubscriberEventPayloadType.UPDATE, this);
  }

  @AfterRemove()
  zoneDeleted(): void {
    console.log('Zone Deleted', this);
  }
}
