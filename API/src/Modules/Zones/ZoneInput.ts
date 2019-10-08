// API/src/Modules/Zones/ZoneInput.ts
import { InputType, Field } from 'type-graphql';

@InputType()
export class ZoneInput {
  @Field()
  domainName: string;

  @Field({ description: 'The user requesting the zone' })
  zoneOwnerUserId: string;

  @Field()
  ns: string;

  @Field()
  contact: string;
}
