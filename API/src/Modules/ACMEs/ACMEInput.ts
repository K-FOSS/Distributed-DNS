// API/src/Modules/ACMEs/ACMEInput.ts
import { InputType, Field, ID } from 'type-graphql';
import { ACME } from './ACMEModel';
import { ACMEDomainInput } from './ACMEDomainInput';

@InputType()
export class ACMEInput implements Partial<ACME> {
  @Field()
  name: string;

  @Field()
  email: string;
}

@InputType()
export class ACMEUpdateInput implements Partial<ACME> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field(() => [ACMEDomainInput], { nullable: true })
  addDomains?: ACMEDomainInput[];

  @Field(() => [ID], { nullable: true })
  removeDomains?: ACMEDomainInput;
}
