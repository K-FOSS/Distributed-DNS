// API/src/Modules/ACMEs/ACMEResolver.ts
import {
  Resolver,
  Mutation,
  Authorized,
  Ctx,
  Arg,
  FieldResolver,
  Root,
  Subscription,
  Query,
} from 'type-graphql';
import { ACME } from './ACMEModel';
import { CurrentUser } from '../Auth/CurrentUser';
import { AuthContext } from 'API/Context';
import { ACMEAccess } from './ACMEAccessModel';
import { Permission } from '../Permission/Permission';
import { ACMEAccount } from './ACMEAccountModel';
import { ACMEDomainInput } from './ACMEDomainInput';
import { ACMEDomain } from './ACMEDomainModel';
import { Certificate } from '../Certificates/CertificateModel';
import { acmePubSub } from './ACMEPubSub';
import { ACMEInput, ACMEUpdateInput } from './ACMEInput';

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

  @Subscription({
    // @ts-ignore
    subscribe: async (stuff, args) => acmePubSub.subscribe(args.ACMEToken),
  })
  certificateEvents(
    @Arg('ACMEToken') ACMEToken: string,
    @Root() cert: Certificate,
  ): Certificate {
    return cert;
  }

  @FieldResolver(() => [ACMEDomain])
  async domains(@Root() acme: ACME): Promise<ACMEDomain[]> {
    return ACMEDomain.find({ acmeId: acme.id });
  }

  @FieldResolver(() => [Certificate])
  async certificates(@Root() acme: ACME): Promise<Certificate[]> {
    return Certificate.find({ where: { acmeId: acme.id } });
  }
}
