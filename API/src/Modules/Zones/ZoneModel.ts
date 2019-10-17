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
} from 'typeorm';
import { Permission } from '../Permission/Permission';
import { ResourceRecord } from '../ResourceRecords/ResourceRecordModel';
import { Subscriber } from '../Subscribers/SubscriberModel';
import { subscriberPubSub } from '../Subscribers/SubscriptionPubSub';
import { User } from '../Users/UserModel';
import { UserRole } from '../Users/UserRole';
import { ZonePermissions } from './ZonePermissionModel';
import { ZoneSettings } from './ZoneSettingsModel';

@ObjectType()
@Entity()
export class Zone extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @OneToOne(() => ZoneSettings, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  zoneSettings: ZoneSettings;
  @Column()
  zoneSettingsId: string;

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
  @OneToMany(() => ResourceRecord, (resourceRecord) => resourceRecord.zone, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  resourceRecords: ResourceRecord[];

  @Field(() => [ZonePermissions])
  @OneToMany(() => ZonePermissions, (zonePermission) => zonePermission.zone, {
    cascade: ['insert', 'update'],
  })
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

    if (user.roles.includes(UserRole.ADMIN)) return zone;
    return zone.checkUserAuthorization(user, requiredPermission);
  }

  @AfterUpdate()
  updateZone(): void {
    subscriberPubSub.publish(this.id, this);
  }
}
