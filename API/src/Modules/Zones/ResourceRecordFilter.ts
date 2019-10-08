// API/src/Modules/Zones/ResourceRecordFilter.ts
import { InputType, Field } from 'type-graphql';
import { ResourceRecordType } from '../ResourceRecords/ResourceRecordTypes';

@InputType()
export class ResourceRecordFilter {
  @Field({ nullable: true })
  host: string;

  @Field(() => ResourceRecordType, { nullable: true })
  type: ResourceRecordType;
}
