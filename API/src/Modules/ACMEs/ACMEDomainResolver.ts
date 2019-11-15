// API/src/Modules/ACMEs/ACMEDomainResolver.ts
import { Resolver, FieldResolver, Root } from 'type-graphql';
import { ACMEDomain } from './ACMEDomainModel';
import { Zone } from '../Zones/ZoneModel';

@Resolver(() => ACMEDomain)
export class ACMEDomainResolver {
  @FieldResolver(() => Zone)
  zone(@Root() { zoneId }: ACMEDomain): Promise<Zone> {
    return Zone.findOneOrFail(zoneId);
  }
}
