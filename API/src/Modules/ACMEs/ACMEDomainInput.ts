// API/src/Modules/ACMEs/ACMEDomainInput.ts
import { InputType, Field } from 'type-graphql';

@InputType()
export class ACMEDomainInput {
  @Field()
  zoneId: string;

  @Field(() => [String])
  domains: string[];
}
