// API/src/Modules/ACMEs/ACMEModel.ts
import { directory } from 'acme-client';
import { config } from 'API/Config';
import { ApolloError } from 'apollo-server-koa';
import { sign, verify } from 'jsonwebtoken';
import {
  Field,
  ForbiddenError,
  ID,
  ObjectType,
  UnauthorizedError,
} from 'type-graphql';
import {
  AfterRemove,
  BaseEntity,
  BeforeRemove,
  Column,
  CreateDateColumn,
  Entity,
  FindOneOptions,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Certificate } from '../Certificates/CertificateModel';
import { Permission } from '../Permission/Permission';
import { User } from '../Users/UserModel';
import { ACMEAccess } from './ACMEAccessModel';
import { ACMEAccount } from './ACMEAccountModel';
import { ACMEDomain } from './ACMEDomainModel';
import { createOrder } from './Actions/CreateOrder';

export const directoryUrl =
  process.env.NODE_ENV === 'production'
    ? directory.letsencrypt.production
    : directory.letsencrypt.staging;

interface ACMETokenPayload {
  acmeId: string;
}

@ObjectType()
@Entity()
export class ACME extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field()
  @Column({ type: 'varchar', default: 'ACME' })
  name: string;

  @OneToMany(
    () => ACMEAccess,
    (acmeAccess) => acmeAccess.acme,
    {
      cascade: true,
    },
  )
  permissions: ACMEAccess[];

  @OneToOne(
    () => ACMEAccount,
    (acmeAccount) => acmeAccount.acme,
    {
      cascade: ['insert', 'remove', 'update'],
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  acmeAccount: ACMEAccount;

  @Column()
  acmeAccountId: string;

  @Field(() => [Certificate])
  @OneToMany(
    () => Certificate,
    (certificate) => certificate.acme,
    {
      cascade: ['insert', 'update', 'remove'],
    },
  )
  certificates: Certificate[];

  @Field(() => [ACMEDomain])
  @OneToMany(
    () => ACMEDomain,
    (acmeDomain) => acmeDomain.acme,
    {
      cascade: ['insert', 'remove', 'update'],
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  domains: ACMEDomain[];

  @Field(() => String)
  async contactEmail(): Promise<string> {
    const acmeAccount = await ACMEAccount.findOneOrFail(this.acmeAccountId);

    return acmeAccount.email;
  }

  async addDomain(zoneId: string, domainNames: string[]): Promise<void> {
    const domains = await ACMEDomain.find({
      where: { acmeId: this.id },
      relations: ['zone'],
    });

    const existingDomain = domains.find((domain) => domain.zoneId === zoneId);
    if (existingDomain) {
      if (
        existingDomain.domains.some((domainName) =>
          domainNames.includes(domainName),
        )
      )
        throw new Error('Duplicate DomainNames');
      existingDomain.domains.push(...domainNames);

      await existingDomain.save();
    } else {
      const newDomain = ACMEDomain.create({
        acmeId: this.id,
        zoneId,
        domains: domainNames,
      });
      await newDomain.save();
    }
  }

  @Field(() => String)
  ACMEToken(): string {
    const payload: ACMETokenPayload = { acmeId: this.id };
    return sign(payload, config.secretKey);
  }

  async generateCertificate(): Promise<void> {
    await createOrder(this.id, this.acmeAccountId);
  }

  async checkUserAuthorization(
    user: User | string,
    requiredPermission: Permission,
  ): Promise<ACME> {
    const authorization = await ACMEAccess.findOne({
      acmeId: this.id,
      userId: typeof user === 'string' ? user : user.id,
    });

    if (authorization && authorization.permission.includes(requiredPermission))
      return this;

    throw new UnauthorizedError();
  }

  static async getUserACMEs(
    user: User | string,
    requiredPermission = Permission.READ,
  ): Promise<ACME[]> {
    const ACMEs = await this.createQueryBuilder('ACME')
      .leftJoinAndSelect('ACME.permissions', 'permissions')
      .where('permissions.userId = :userId', {
        userId: typeof user === 'string' ? user : user.id,
      })
      .andWhere(`permissions.permission @> '{"${requiredPermission}"}'`)
      .getMany();

    return ACMEs;
  }

  static async getUserACME(
    acmeId: string,
    user: User | string,
    findActions?: FindOneOptions<ACME>,
    requiredPermission = Permission.READ,
  ): Promise<ACME> {
    const acme = await ACME.findOneOrFail(acmeId, findActions);
    if (!acme) throw new ForbiddenError();

    return acme.checkUserAuthorization(user, requiredPermission);
  }

  static async getACMEFromToken(acmeToken: string): Promise<ACME> {
    const payload = verify(acmeToken, config.secretKey) as ACMETokenPayload;
    if (!payload.acmeId)
      throw new ApolloError('Invalid ACME token', 'INVALID_ACME_TOKEN');

    const acme = await this.findOne(payload.acmeId);
    if (!acme) throw new ApolloError('INVALID ACME', 'INVALID_ACME');

    return acme;
  }

  @BeforeRemove()
  async cleanRemove(): Promise<void> {
    const acmeAccesses = await ACMEAccess.find({ where: { acmeId: this.id } });
    await ACMEAccess.remove(acmeAccesses);
  }

  @AfterRemove()
  async afterRemove(): Promise<void> {
    ACMEAccount.delete({ id: this.acmeAccountId });
  }
}
