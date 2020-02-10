// API/src/Modules/ACMEs/ACMEResolver.ts
import { AuthContext } from 'API/Context';
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  ForbiddenError,
  ID,
  Mutation,
  Query,
  Resolver,
  Root,
  Int,
} from 'type-graphql';
import { CurrentUser } from '../Auth/CurrentUser';
import { Certificate } from '../Certificates/CertificateModel';
import { getPermission, Permission } from '../Permission/Permission';
import { ACMEAccess } from './ACMEAccessModel';
import { ACMEAccount } from './ACMEAccountModel';
import { ACMEDomainInput } from './ACMEDomainInput';
import { ACMEDomain } from './ACMEDomainModel';
import { ACMEInput, ACMEUpdateInput } from './ACMEInput';
import { ACME } from './ACMEModel';

@Resolver(() => ACME)
export class ACMEResolver {
  @Authorized()
  @Query(() => ACME)
  async ACME(
    @Arg('acmeId') acmeId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<ACME> {
    return ACME.getUserACME(acmeId, currentUser);
  }

  @Authorized()
  @Mutation(() => CurrentUser)
  async createACME(
    @Arg('input') { email, ...input }: ACMEInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<CurrentUser> {
    const acmeAccount = ACMEAccount.create({ email });

    const acme = ACME.create({ permissions: [], ...input });
    const permission = ACMEAccess.create({
      userId: currentUser.id,
      permission: [Permission.READ, Permission.WRITE, Permission.ADMIN],
    });

    acme.permissions.push(permission);
    acme.acmeAccount = acmeAccount;
    await acme.save();

    return currentUser;
  }

  @Authorized()
  @Mutation(() => CurrentUser)
  async deleteACME(
    @Arg('acmeId') acmeId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<CurrentUser> {
    const acme = await ACME.getUserACME(
      acmeId,
      currentUser.id,
      {},
      Permission.ADMIN,
    );

    await acme.remove();

    return currentUser;
  }

  @Authorized()
  @Mutation(() => ACME)
  async updateACME(
    @Arg('acmeId') acmeId: string,
    @Arg('input') { email, name, addDomains }: ACMEUpdateInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<ACME> {
    const acme = await ACME.getUserACME(
      acmeId,
      currentUser.id,
      { relations: ['acmeAccount'] },
      Permission.ADMIN,
    );

    if (email) acme.acmeAccount.email = email;
    if (name) acme.name = name;

    if (addDomains)
      for (const addDomain of addDomains)
        await acme.addDomain(addDomain.zoneId, addDomain.domains);

    await acme.save();

    return acme;
  }

  @Authorized()
  @Mutation(() => ACME)
  async addACMEDomain(
    @Arg('acmeId') acmeId: string,
    @Arg('input', () => [ACMEDomainInput]) input: ACMEDomainInput[],
    @Ctx() { currentUser }: AuthContext,
  ): Promise<ACME> {
    const acme = await ACME.getUserACME(
      acmeId,
      currentUser.id,
      {
        relations: ['domains'],
      },
      Permission.ADMIN,
    );

    acme.domains.push(
      ...input.map((domainInput) => ACMEDomain.create(domainInput)),
    );
    await acme.save();

    return acme;
  }

  @Authorized()
  @Mutation(() => ACME)
  async generateCertificate(
    @Arg('acmeId') acmeId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<ACME> {
    const acme = await ACME.getUserACME(
      acmeId,
      currentUser.id,
      {},
      Permission.ADMIN,
    );

    await acme.generateCertificate();

    return acme;
  }

  @Authorized()
  @Mutation(() => ACME)
  async revokeCertificate(
    @Arg('certificateId', () => ID) certificateId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<ACME> {
    const certificate = await Certificate.findOneOrFail({
      where: {
        id: certificateId,
      },
      relations: ['acme'],
    });

    await certificate.acme.checkUserAuthorization(
      currentUser,
      Permission.ADMIN,
    );

    return certificate.acme;
  }

  @FieldResolver(() => [ACMEDomain])
  async domains(@Root() acme: ACME): Promise<ACMEDomain[]> {
    return ACMEDomain.find({ acmeId: acme.id });
  }

  @FieldResolver(() => [Certificate])
  async certificates(
    @Root() acme: ACME,
    @Arg('count', () => Int, { defaultValue: undefined, nullable: true })
    take: number,
  ): Promise<Certificate[]> {
    return Certificate.find({
      where: { acmeId: acme.id },
      order: { createdAt: 'DESC' },
      take,
    });
  }

  @Authorized()
  @FieldResolver(() => Permission)
  async acmeUserPermission(
    @Root() { id }: ACME,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Permission> {
    const acmeUserAccess = await ACMEAccess.findOne({
      where: {
        userId: currentUser.id,
        acmeId: id,
      },
    });
    if (!acmeUserAccess) throw new ForbiddenError();

    return getPermission(acmeUserAccess.permission);
  }
}
