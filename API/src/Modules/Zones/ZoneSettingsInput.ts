// API/src/Modules/Zones/ZoneSettingsInput.ts
import { InputType, Field } from 'type-graphql';

@InputType()
export class ZoneSettingsInput {
  @Field()
  stuff: string;
}
